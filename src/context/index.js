import React, { useState, useEffect, createContext, useContext } from 'react'
import { db } from '../firebase'
import { COLLECTION_NAME } from '../constants'
import { AuthContext } from './authContext'

const TrelloContext = createContext()

const TrelloProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const [list, setList] = useState([])
  const [listTitle, setListTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [cardTitle, setCardTitle] = useState('')
  const [listCount, setListCount] = useState(0)

  // handle input changes
  const listTitleInput = (e) => {
    setListTitle(e.target.value)
  }
  // -------------

  // add new empty list to the board
  const addList = (e) => {
    e.preventDefault()
    setLoading(true)
    if (listTitle.trim('') !== '') {
      const docRef = db.collection(COLLECTION_NAME).doc(listTitle)

      docRef.get().then((doc) => {
        if (!doc.exists) {
          db.collection(COLLECTION_NAME)
            .get()
            .then((snapshot) => {
              const newList = snapshot.docs.map((doc) => doc.data().position)
              const max = Math.max(...newList) + 1
              docRef
                .set({
                  userId: currentUser.uid,
                  position: max === Math.max() ? 0 : max,
                  cards: [],
                })
                .then(() => {
                  setLoading(false)
                  setListTitle('')
                })
            })
        } else {
          setError('list Already exists !!')
          setLoading(false)
        }
      })
    } else {
      setError('list title empty ')
      setLoading(false)
    }
    setTimeout(() => setError(''), 1500)
  }

  // adding a card to the specified list
  const addCard = (e, id) => {
    e.preventDefault()
    setLoading(true)
    if (cardTitle.trim('') !== '') {
      const docRef = db.collection(COLLECTION_NAME).doc(id)

      docRef.get().then((doc) => {
        if (doc.exists) {
          docRef
            .set({
              ...doc.data(),
              cards: [...doc.data().cards, cardTitle],
            })
            .then(() => {
              setLoading(false)
            })
        }
      })
    } else {
      setError('there is something wrong !!')
      setLoading(false)
    }
    setTimeout(() => setError(''), 1500)
  }

  // update list header
  const updateListHeader = (id, title) => {
    setLoading(true)
    db.collection(COLLECTION_NAME)
      .doc(id)
      .update({
        id: title,
      })
      .then(() => {
        setLoading(false)
      })
  }

  // update list header
  const removeList = (id) => {
    setLoading(true)
    db.collection(COLLECTION_NAME)
      .doc(id)
      .delete()
      .then(() => {
        setLoading(false)
        resetListPosition()
      })
  }

  // get all list of this board
  const getAllLists = () => {
    if (currentUser) {
      setLoading(true)
      db.collection(COLLECTION_NAME)
        .orderBy('position')
        .onSnapshot((snapshot) => {
          const newList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              docId: doc.id,
              ...doc.data(),
            }
          })
          setList(newList)
          setListCount(newList.length)
          setLoading(false)
        })
    }
  }

  const updateListPosition = (result) => {
    if (result.destination === null) return
    const col = db.collection(COLLECTION_NAME)
    const { draggableId, destination, source } = result
    col
      .where('position', '==', destination.index)
      .get()
      .then((snap) => {
        col.doc(snap.docs[0].id).update({
          position: source.index,
        })
      })

    col.doc(draggableId).update({
      position: destination.index,
    })
  }
  const resetListPosition = () => {
    const col = db.collection(COLLECTION_NAME)
    col
      .get()
      .then((snap) => {
        snap.docs.forEach((doc, idx) => {
          col.doc(doc.id).update({
            position: idx,
          })
        })
      })
      .then(() => {
        console.log('resetListPosition is done !')
      })
  }

  useEffect(() => {
    getAllLists()

    return () => getAllLists()
  }, [listCount])

  const values = {
    list,
    loading,
    error,
    listTitleInput,
    addList,
    listTitle,
    addCard,
    updateListHeader,
    removeList,
    setCardTitle,
    updateListPosition,
  }
  return <TrelloContext.Provider value={values} children={children} />
}

export { TrelloContext, TrelloProvider }
