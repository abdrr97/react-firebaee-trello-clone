import React, { useContext } from 'react'
import { CgClose } from 'react-icons/cg'
import { TrelloContext } from '../../context'
import { motion } from 'framer-motion'

const Form = ({ cards, id, setToggle }) => {
  const { addCard, cardTitle, setCardTitle } = useContext(TrelloContext)
  const cardTitleInput = (e) => {
    setCardTitle(e.target.value)
  }

  return (
    <>
      <motion.form
        layout
        onSubmit={(e) => {
          addCard(e, id)
          setCardTitle('')
        }}
      >
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
      </motion.form>
    </>
  )
}

export default Form
