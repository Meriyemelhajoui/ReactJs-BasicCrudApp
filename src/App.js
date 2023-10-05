import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Products from './Components/Products';
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react';
import NewProduct from './Components/NewProduct';
import EditProduct from './Components/EditProduct';
import { AppContext, useAppState } from './app/app';
import State from './Components/State';

function App() {
  const [currentRoute,setCurrentRoute]=useState();  // Manager les states dans une function based  class 

  // useEffect Hook : Faire un traitement au chargement du composant il s effectue 1 et 1 seule fois meme si props or states changes

  useEffect(()=>{
    const path=window.location.pathname.toLowerCase(); 
    setCurrentRoute(path.slice(1,path.length)); // au moment de telechargement de composant App , on stocke le path dans le current State 
    console.log(path); 
  },[]);
    

  
  return (
    // on va mettre toute la racine dans app context pour que l info soit partage et accessible a travers tous les composants de notre app 
    // valeur c est la donne qu'on veut partager avec tous les composants de l app 
    <AppContext.Provider value={useAppState()}>
      
    <BrowserRouter>
    <nav className='m-1 p-1 border border border-info navbar navbar-expand-lg navbar-light bg-light'>
      <ul className='nav na-pills'>
        <li>
          <Link  onClick ={()=>setCurrentRoute("Home")}className={currentRoute =="Home" ?"btn btn-info ms-1":"btn btn-outline-info ms-1"} to={"/home"}> Home</Link>
        </li>

        <li>
          <Link onClick ={()=>setCurrentRoute("Products")}className={currentRoute =="Products" ?"btn btn-info ms-1":"btn btn-outline-info ms-1"} to={"/products"}>Products</Link>
        </li>
        <li>
          <Link onClick ={()=>setCurrentRoute("newProducts")}className={currentRoute =="newProducts" ?"btn btn-info ms-1":"btn btn-outline-info ms-1"} to={"/newProducts"}>New Product</Link>
        </li>
      </ul>
      <ul className='nav navbar-nav'>
        <li>
          <State/>
        </li>
      </ul>
    </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/newProducts" element={<NewProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  
    </AppContext.Provider>
  );
}


export default App;
