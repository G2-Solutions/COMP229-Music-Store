import React from 'react'
import {Route, Routes} from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import Home from './core/Home.js'

const MainRouter = () => {
    return (<div>
      <Home/>
    </div>)
}

export default MainRouter
