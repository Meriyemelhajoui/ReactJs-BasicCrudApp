import React from 'react'
import { useState } from 'react';
import { saveProduct } from '../app/app';

export default function NewProduct() {

    // on doit gerer les inputs saisies dans le formulaire en utlisant Hook useState
    const[name,setName]=useState("");
    const[price,setPrice]=useState(0); // prend comme valeur par defaut 0
    const[checked,setCheck]=useState(false); 


    // creation de handler qui permet d enregistrer le produit 
    const handleSaveProduct=(event)=>{ // cette fct s execute lors d un evenement (OnSubmit)
        // on va annuler a chaque submit de rafraichir la page via JS
        event.preventDefault(); 
        let product={name,price,checked}; //creation d un objet Produit 
        saveProduct(product) //fct deja cree en repository
        .then((resp)=>{
           alert(JSON.stringify(resp.data)); // afficher le produit ajoute sous forme de String 
        });
    }; 

  return (
    <div className='row p-1'>
        <div className='col-md-6'>
            <div className='card'>
                <div className='card-body'>
                    <form onSubmit={handleSaveProduct} >
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
                        <button className='btn btn-success m-1'>Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
)
}
