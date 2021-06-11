import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Error from './pages/Error'
import { TrelloProvider } from './context'
export const App = () => {
  // document.body.className = 'bg-dark text-light'
  return (
    <>
      <main className='container-fluid'>
        <TrelloProvider>
          <Router>
            <Switch>
              <Route exact path='/' component={Dashboard} />

              <Route path='*' component={Error} />
            </Switch>
          </Router>
        </TrelloProvider>
      </main>
    </>
  )
}
