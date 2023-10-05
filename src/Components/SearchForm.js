import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import { AppContext } from '../app/app';
// lors de decoupe de notre code de composant en plusieurs composants pour pouvoir optimiser le code et le reutiliser , on doit passer au formulaire des props pour qu'il fontionne

export default function SearchForm({ handleGetProducts}) {
    // recuperation de state a partir de contexte
    const[state,setState]=useContext(AppContext);
    const[query,setQuery]=useState("");
    // methode pour handler la recherche d un produit qui sera declenche lors d un event 
const handleSearch=(event)=>{
    // prevent d actualiser la page apres submit de la recherche
    event.preventDefault();
   // mnt on va appeler la fct de getProducts with the state de keyword update par query
   handleGetProducts(query,1,state.pageSize);  // on a fait 1 pour que les produits s affiche de 1 ere page ( mm si le resulat de recherche peut se trouver dans la page 2 et 3 on v aafficher 1 et 2 )

};
return (
    <div>
    <form onSubmit={handleSearch}>
                        <div className=' row g-2 '>
                            <div className='col-auto'>
                                <input value={query} onChange={(e)=>setQuery(e.target.value)} className='form-control'></input>
                            </div>
                            <div className='col-auto'>
                            <button className='btn btn-success'>
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </button>
                            </div>
                        </div>
                    </form>
    </div>
);
}
