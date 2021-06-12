import React, { useContext } from 'react'
import List from '../components/List'
import { TrelloContext } from '../context'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { list, loading, error, listTitleInput, addList, listTitle } = useContext(TrelloContext)

  return (
    <>
      <nav className='navbar navbar-light bg-light mb-5'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            Trello Clone
          </Link>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link active' to='/'>
                  Boards
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='text-center my-5'>
        {loading && <h3 className='fw-light'>Loading ...</h3>}
        {error && <h3 className='text-danger fw-light'>{error}</h3>}
      </div>
      <div className='row mt-5'>
        {list && list.map((_list) => <List key={_list.id} {..._list} />)}

        <motion.div layout className='col-2'>
          <div className='card'>
            <div className='card-body'>
              <form onSubmit={(e) => addList(e)}>
                <input
                  type='text'
                  autoFocus
                  value={listTitle}
                  onChange={listTitleInput}
                  placeholder='Enter list title ...'
                  className='form-control mb-3'
                />
                <button onClick={addList} className='btn btn-sm btn-primary'>
                  + add list
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Dashboard
