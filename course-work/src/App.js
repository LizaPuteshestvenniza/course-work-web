import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from "./Checkout";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>> ', authUser);
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<><Header/><Home/></>} />
          <Route path="/checkout" element={<><Header/><Checkout /></>} />
          <Route path="/login" element={<Login/>} />
          {/*<Route path="/login" element{}/>*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
