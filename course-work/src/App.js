import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Payment from './Payment';
import Checkout from "./Checkout";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51MG9oOBz01CJ9SFFqzytUnGw4cMbhfDMp7U8LflIkxtHn7hjq3wVjqbW4lgaCME6HpFsovdDnWYEMJC4BTpujWvf00HyMVpmsF");


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
          <Route path="/payment" element={<><Header/>              <Elements stripe={promise}>
            <Payment/>
          </Elements></>} />
          <Route path="/login" element={<Login/>} />
          {/*<Route path="/login" element{}/>*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
