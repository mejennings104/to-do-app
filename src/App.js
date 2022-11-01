import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext'
import Navigation from './components/Navigation' 
import Login from './components/Auth/Login'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Categories from './components/Categories/Categories'
import Bootstrap from './components/Bootstrap/Bootstrap';
import ToDos from './components/ToDos/ToDos';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        {/* The below component is actually calling the BroswerRouter from react-router-dom, but we made an alias in the
            import. We surround the Navigation component because it has link components called from react-router-dom package 
            and rendered in that component. Per the docs on their site, link, routes, and the route need to be rendered inside
            the Router component. */}
        <Router>
          <Navigation />
          {/* This is like a switch that decides what to render on the screen based on the url path */}
          <Routes>
            <Route path='/' element={ <Bootstrap/> } />
            <Route path='/bootstrap' element={ <Bootstrap/>} />
            <Route path='/categories' element={ <ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path='/todos' element={ <ToDos />} />
            <Route path='/login' element={ <Login/>} />
            <Route path='*' element={ <NotFound/>} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}
export default App;
