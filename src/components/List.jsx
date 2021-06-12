import React, { useContext, useState } from 'react'
import { TrelloContext } from '../context'
import { BsThreeDots } from 'react-icons/bs'
import CardList from './card/CardList'
import { Draggable } from 'react-beautiful-dnd'
const C_HEADER = 'card-header d-flex justify-content-between align-items-center'

const List = ({ id, docId, cards, position }) => {
  const [toggleHeader, setToggleHeader] = useState(false)
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [headerTitle, setHeaderTitle] = useState(id)
  const { updateListHeader, removeList } = useContext(TrelloContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    updateListHeader(docId, headerTitle)
    setToggleHeader(false)
  }
  return (
    <>
      <Draggable draggableId={id} index={position}>
        {(provided, snapshot) => (
          <section
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            className='col-2 mb-5'
          >
            <div
              className='card shadow-sm'
              style={{
                background: snapshot.isDragging ? 'lightblue' : 'white',
              }}
            >
              <div className={C_HEADER}>
                {toggleHeader ? (
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                      autoFocus
                      type='text'
                      onBlur={handleSubmit}
                      value={headerTitle}
                      onChange={(e) => setHeaderTitle(e.target.value)}
                      className='form-control'
                    />
                  </form>
                ) : (
                  <h5 style={{ cursor: 'pointer' }} onClick={() => setToggleHeader(!toggleHeader)}>
                    {id}
                  </h5>
                )}

                <div className='dropdown'>
                  <button
                    type='button'
                    className='btn btn-sm'
                    onClick={() => setToggleDropdown(!toggleDropdown)}
                  >
                    <BsThreeDots />
                  </button>

                  {toggleDropdown && (
                    <ul className='dropdown-menu show'>
                      <li
                        onClick={() => {
                          removeList(docId)
                          setToggleDropdown(!toggleDropdown)
                        }}
                        onMouseLeave={() => setToggleDropdown(false)}
                      >
                        <button className='btn btn-sm btn-danger dropdown-item'>delete</button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              <div className='card-body'>
                <CardList cards={cards} id={docId} />
              </div>
            </div>
          </section>
        )}
      </Draggable>
    </>
  )
}

export default List
