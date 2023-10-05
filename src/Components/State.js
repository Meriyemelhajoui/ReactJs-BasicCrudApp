import React, { useContext } from 'react'
import { AppContext } from '../app/app'
// ce composant va refleter le nbr de produit qu'on a dans le state 
export default function State() {

    const[state,setState]=useContext(AppContext); // recuperer l AppState  
return (
    <div>
    <button type="button" className="btn btn-primary position-relative">
        Panier
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {state.products.length}

        </span>
</button>
    </div>
);
}
