import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TrelloProvider } from './context'
import { AuthProvider } from './context/authContext'

// imp pages
import Dashboard from './pages/Dashboard'
import NotFound from './pages/Error'
// auth pages
import Signup from './pages/auth/SignUp'
import Login from './pages/auth/Login'
import UpdateProfile from './pages/auth/UpdateProfile'
import ForgotPassword from './pages/auth/ForgotPassword'
// private route
import PrivateRoute from './routes/PrivateRoute'

export const App = () => {
  return (
    <>
      <main className='container-fluid'>
        <AuthProvider>
          <TrelloProvider>
            <Router>
              <Switch>
                <PrivateRoute exact path='/' component={Dashboard} />

                {/* <Route exact path='/' component={Dashboard} /> */}

                <Route path='/sign-up' component={Signup} />
                <Route path='/log-in' component={Login} />
                <Route path='/update-profile' component={UpdateProfile} />
                <Route path='/forgot-password' component={ForgotPassword} />

                <Route path='*' component={NotFound} />
              </Switch>
            </Router>
          </TrelloProvider>
        </AuthProvider>
      </main>
    </>
  )
}
