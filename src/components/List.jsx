import React, { useContext, useState } from 'react'
import { TrelloContext } from '../context'
import { BsThreeDots } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg'

const C_HEADER = 'card-header d-flex justify-content-between align-items-center'

const List = ({ id, docId, cards }) => {
  const [toggle, setToggle] = useState(false)
  const [toggleHeader, setToggleHeader] = useState(false)
  const [headerTitle, setHeaderTitle] = useState(id)
  const { addCard, cardTitle, cardTitleInput, updateListHeader } = useContext(TrelloContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateListHeader(docId, headerTitle)
    setToggleHeader(false)
  }

  return (
    <>
      <section className='col-2 mb-5'>
        <div className='card shadow-sm'>
          <div className={C_HEADER} onClick={() => setToggleHeader(!toggleHeader)}>
            {toggleHeader ? (
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  onBlur={handleSubmit}
                  autoFocus
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  type='text'
                  className='form-control'
                />
              </form>
            ) : (
              <h5 style={{ textTransform: 'capitalize', cursor: 'pointer' }}>{id}</h5>
            )}
            <button className='btn btn-sm'>
              <BsThreeDots />
            </button>
          </div>
          <div className='card-body  '>
            {cards.length > 0 && (
              <ul className='list-group mb-3'>
                {cards.map((card, idx) => (
                  <li
                    key={idx}
                    className='list-group-item d-flex justify-content-betweel align-items-center'
                  >
                    {card}
                  </li>
                ))}
              </ul>
            )}
            {toggle && (
              <form onSubmit={(e) => addCard(e, id)}>
                <textarea
                  placeholder='Enter a title for this card ...'
                  autoFocus
                  type='text'
                  value={cardTitle}
                  onChange={cardTitleInput}
                  className='form-control mb-3'
                />
                <div className='d-flex justify-content-between align-items-center'>
                  <button type='submit' className='btn btn-sm btn-primary'>
                    {cards.length === 0 ? '+ add card' : '+ add another card'}
                  </button>
                  <button onClick={() => setToggle(false)} type='button' className='btn btn-sm'>
                    <CgClose />
                  </button>
                </div>
              </form>
            )}
            {!toggle && (
              <button onClick={() => setToggle(true)} className='btn mb-3 btn-sm btn-success'>
                {cards.length === 0 ? '+ add card' : '+ add another card'}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default List
