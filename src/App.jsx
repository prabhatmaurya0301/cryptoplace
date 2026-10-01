import React from "react";
import Nav from "./components/Navbar";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import { Route, Routes} from 'react-router-dom'
import Footer from "./components/Footer";


function App() {
  return (
    <div className="app">
      <Nav />
      <Routes>
         <Route path="/" element = {<Home/>}/>
         <Route path="/coin/:coinID" element = {<Coin/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;