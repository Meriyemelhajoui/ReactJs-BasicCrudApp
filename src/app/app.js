import axios from "axios";
import { createContext, useState } from "react";

// ce fichier represente en quelques sort : Repository pour separer entre les couches metiers service Vue afin d avoir un code assez lisible et facile a maintenir 

// definir Url de Base de l application
export const ProductsApi= axios.create({
    baseURL:"http://localhost:9000"
});


// get all products
export const getProducts=(keywords="",page=1,size=4)=>{
    return ProductsApi.get(`/products?name_like=${keywords}&_page=${page}&_limit=${size}`);
};

// supprimer un produit 
export const deleteProduct=(product)=>{
    return ProductsApi.delete(`/products/${product.id}`);
};


// retourner un produit 
export const getProductById=(id)=>{
    return ProductsApi.get(`/products/${id}`);
};


// ajouter un produit 
export const saveProduct=(product)=>{
    return ProductsApi.post(`/products`,product);
};


// path permet de mettre a jour un attribut ou plus d un objet Produit 
// on va changer dans le Check de produit 
export const checkProduct=(product)=>{
    return ProductsApi.patch(`/products/${product.id}`,{checked:!product.checked});
};

// put pour mettre a jour tous les attributs d un produit 
export const updateProduct=(product)=>{
    return ProductsApi.put(`/products/${product.id}`,product);
}

// creation de contexte de notre application 
export const AppContext=createContext();  
// creation d un Hook Personnalise qui va etre mis dans le contexte de l app pour qu'il soit partage entre tous les composants de l application et il est initialise par les valeurs stockes dans l objet initialised 
export const useAppState=()=>{
    const initialState={
        products:[],
        currentPage:1,
        pageSize:4,
        keyword:"", //initialiser le state par ces valeurs par defaut 
        totalPages:0,
    };

    const appState=useState(initialState);
    return appState;  //ce Hook personnalise retourne une instance de Hook de Type useAppState , cette derniere peut etre modifie dans son etat en utuilisant setAppState 
};

