import React, { useContext, useState } from 'react'
import List from '../components/List'
import { TrelloContext } from '../context'
import { motion } from 'framer-motion'
import { Link, useHistory } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { AuthContext } from '../context/authContext'

const Dashboard = () => {
  const { list, loading, error, listTitleInput, addList, listTitle, updateListPosition } =
    useContext(TrelloContext)

  // auth
  const [authError, setAuthError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { currentUser, logout } = useContext(AuthContext)
  const history = useHistory()

  const handleLogout = () => {
    setAuthError('')
    try {
      logout().then(() => {
        history.push('/log-in')
      })
    } catch (ex) {
      setAuthError(ex.message)
    }
  }

  return (
    <>
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <div className='card'>
          <div className='card-body'>
            <h2 className='text-center mb-4'>Profiless</h2>
            {error && <div className='alert alert-danger'>{error}</div>}
            <strong>Email :</strong> {currentUser.email}
            <Link to='update-profile' className='btn btn-primary w-100 mt-3'>
              Update Profile
            </Link>
            <button className='btn-link btn' onClick={handleLogout}>
              Log Out
            </button>
          </div>
          <div className='w-100 text-center mt-2'></div>
        </div>
      </div>

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

      <DragDropContext onDragEnd={(result) => updateListPosition(result)}>
        <Droppable
          ignoreContainerClipping={true}
          isCombineEnabled={true}
          type='COLUMN'
          direction='horizontal'
          droppableId='board'
        >
          {(provided, snapshot) =>
            list && (
              <div className='row mt-5' ref={provided.innerRef} {...provided.droppableProps}>
                {list.map((_list, idx) => (
                  <List key={_list.id} {..._list} index={idx} />
                ))}
                {provided.placeholder}
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
            )
          }
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default Dashboard
