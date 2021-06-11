import React, { useState, useEffect, createContext } from 'react'
import { db, timestamp } from '../firebase'
import { COLLECTION_NAME } from '../constants'

const TrelloContext = createContext()
const TrelloProvider = ({ children }) => {
  const [list, setList] = useState([])
  const [listTitle, setListTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [cardTitle, setCardTitle] = useState('')

  // handle input changes
  const cardTitleInput = (e) => {
    setCardTitle(e.target.value)
  }
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
          docRef
            .set({
              cards: [],
            })
            .then(() => {
              setLoading(false)
              setListTitle('')
            })
        } else {
          setError('there is something wrong !!')
          setLoading(false)
        }
      })
    } else {
      setError('there is something wrong !!')
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
              cards: [...doc.data().cards, cardTitle],
            })
            .then(() => {
              setCardTitle('')
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

  useEffect(() => {
    setLoading(true)
    db.collection(COLLECTION_NAME).onSnapshot((snapshot) => {
      const newList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          docId: doc.id,
          ...doc.data(),
        }
      })
      setList(newList)
      setLoading(false)
    })
  }, [])

  const values = {
    list,
    loading,
    error,
    listTitleInput,
    addList,
    listTitle,
    addCard,
    cardTitle,
    cardTitleInput,
    updateListHeader,
  }
  return <TrelloContext.Provider value={values} children={children} />
}

export { TrelloContext, TrelloProvider }
