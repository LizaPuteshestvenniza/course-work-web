import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from "./Checkout";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';


function App() {
  return (
      <Router>
          <div className="App">
              <Header />
              <Routes>
                  <Route path="/"  element={<Home />}/> {/*add element={<Home />} */}
                  <Route path="/checkout" element={<Checkout />}/>
                  {/*<Route path="/login" element{}/>*/}
              </Routes>
          </div>
      </Router>
  );
}

export default App;
