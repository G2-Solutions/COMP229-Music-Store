import React from 'react'
import {Route, Routes} from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import Home from './core/Home.js'

const MainRouter = () => {
    return (<div>
      <Home/>
      /*<Routes>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
      </Routes>*/
    </div>)
}

export default MainRouter
