import React, { useEffect } from 'react'
import { useState } from 'react';
import { getProductById, saveProduct, updateProduct } from '../app/app';
import { useParams } from 'react-router-dom';

export default function EditProduct() {

// recuperation de le parametre id a partir de la requete (il se renvoie sous forme d objet )
const {id}=useParams();

// on doit avoir le produit par son id des le telechargement de la page du coup on va utiliser le Hook useEffect
useEffect(()=>{
    handleGetProductById(id); // methode qu'on va definir qui va appeler le EndPoint getProductById
},[]);

// methode pour handler le produit lors de l appel avec son id 
const handleGetProductById=(id)=>{
    // communication avec le Backend our recuperer le produit selon le givven id 
    getProductById(id).then((resp)=>{
        let produit=resp.data; // reponse depuis le backend
        // mise a jour du state avec les nv valeur qui seront representes dans les inputs de Formulaire 
        setName(produit.name);
        setCheck(produit.checked);
        setPrice(produit.price);

    });
};
   



    // on doit gerer les inputs saisies dans le formulaire en utlisant Hook useState
    const[name,setName]=useState("");
    const[price,setPrice]=useState(0); // prend comme valeur par defaut 0
    const[checked,setCheck]=useState(false); 

 
    // creation de handler qui permet d updater le produit 
    const handleUpdateProduct=(event)=>{ // cette fct s execute lors d un evenement (OnSubmit)
        // on va annuler a chaque submit de rafraichir la page via JS
        event.preventDefault(); 
        let product={ id , name,price,checked}; //on doit envoyer l id dans l update 
        updateProduct(product) //fct deja cree en repository
        .then((resp)=>{
           alert(JSON.stringify(resp.data)); // afficher le produit ajoute sous forme de String 
        });
    }; 

  return (
    <div className='row p-1'>
        <div className='col-md-6'>
            <div className='card'>
                <div className='card-body'>
                    <form onSubmit={handleUpdateProduct} >
                        <div className='mb-4 p-2'>
                            <label className='form-label'>Name :</label>
                            <input  onChange={(e)=>setName(e.target.value)} value={name}className='form-control'></input>
                        </div>
                        <div className='mb-3 p-2'>
                            <label className='form-label'>Price :</label>
                            <input onChange={(e)=>setPrice(e.target.value)} value={price} className='form-control'></input>
                        </div>

                        <div className="form-check">
                        
                        <input  onChange={(e)=>setCheck(e.target.checked)} checked={checked} className="form-check-input" type="checkbox" />
                        <label className="form-check-label" for="flexRadioDisabled">
                                Checked 
                        </label>
                        </div>
                        <button className='btn btn-success m-1'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
)
}
