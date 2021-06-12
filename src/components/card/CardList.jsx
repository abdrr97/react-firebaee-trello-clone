import React, { useState } from 'react'
import Form from './Form'

const CardList = ({ cards, id }) => {
  const [toggle, setToggle] = useState(false)

  return (
    <>
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
      {toggle ? (
        <Form cards={cards} id={id} setToggle={setToggle} />
      ) : (
        <button onClick={() => setToggle(true)} className='btn mb-3 btn-sm btn-success'>
          {cards.length === 0 ? '+ add card' : '+ add another card'}
        </button>
      )}
    </>
  )
}

export default CardList
