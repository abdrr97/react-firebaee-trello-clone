import React, { useContext } from 'react'
import List from '../components/List'
import { TrelloContext } from '../context'

const Dashboard = () => {
  const { list, loading, error, listTitleInput, addList, listTitle } = useContext(TrelloContext)

  return (
    <>
      <h1 className='display-4 mb-3'>Trello Clone</h1>
      {loading && <h3 className='fw-light'>Loading ...</h3>}
      {error && <h3 className='text-danger fw-light'>{error}</h3>}

      <div className='row'>
        {list && list.map((_list) => <List key={_list.id} {..._list} />)}

        <div className='col-2'>
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
        </div>
      </div>
    </>
  )
}

export default Dashboard
