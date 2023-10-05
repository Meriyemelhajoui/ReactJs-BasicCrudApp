import { faCheck, faCheckCircle, faCircle, faEdit, faFaceAngry, faSearch, faSquare, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState  } from 'react'
import axios from 'axios';
import { AppContext, checkProduct, deleteProduct, deleteProducts, getProducts } from '../app/app';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';

export default function Products() {


        // on va utiliser un Hook de navigation , cad il va nous aider a naviguer entre les routes , ce Hook va etre appele lors de declenchement des evenements ... 
const navigate = useNavigate();


    // useState Hook
// var qui va stocker la chaine saisie dans la barre de recherche 
const[query,setQuery]=useState("");


// acceder au contexte de notre application 
const [state,setState]=useContext(AppContext);
    

const handleGetProducts=(keyword,page,size)=>{
    getProducts(keyword,page,size)
    .then(resp=>{
        // recuperation des pages totales a partir de Header de la requete 
        const totalElements=resp.headers['x-total-count']; // le nmbr total des pages qui existent dans DB(cad par exemple on a 12 produits , chaque page affiche 4 produits Per page)
        let totalPages=Math.floor(totalElements/size); // 12/4=3 pages actuelles , mais on doit handle le cas ou il y a une virgule cad il y a 13 produits alors il faut 4 pages et non pas que 3 
        if(totalElements%size != 0) ++totalPages; 
        setState({products:resp.data,keyword:keyword,currentPage:page,pageSize:size , totalPages:totalPages }); //  mettre a jour  les states (page, size ,keyword ...., et recuperer les produits selon eux)
    })
    .catch(err=>{
        console.log(err);
    })
    };



    // Declaration de Hook qui va etre execute lors de telechargement du component 
    useEffect(() =>{
        handleGetProducts(state.keyword,state.currentPage,state.pageSize); // methode de recuperation des produits
    },[]);





// Declaration de la fonction qui va supprimer le produit lors de clique sur Trash Icon
const handleDeleteProduct=(product)=>{
    deleteProduct(product) 
    .then((resp)=>{
        const newProducts=state.products.filter((p)=>
            p.id!=product.id); // juste ignorer le produit qui a ete supprime avec le giveen id et non pas telecharger tous les produits avec une requete de Get
            setState({...state,products:newProducts});
        }); 
};


// methode pour changer l etat d un produit checked / Unchecked

const handleCheckProduct=(product)=>{
    // Synchroniser le backend avec le front end sans 
    checkProduct(product).then((resp)=>{
        const newProducts=state.products.map(p=>{
            if(p.id==product.id){
                p.checked=!p.checked; // l etat inverse si c etait true devient false
            }
            return p; 
        });
         // mise a jour de la liste des produits 
    setState({...state,products:newProducts}); 
    });
    


};

// methode pour handler le pagginage entre les pages , lorsqu'on demande une page on ne change pas le keyword ou le size que la valeur de page 
const handleGoToPage=(page)=>{
    handleGetProducts(state.keyword,page,state.pageSize);
}








return (
<div className='p-1 m-1'>
    <div className='row'>
        <div className='col-md-6'>
            <div className='card-body m-2 '>
                <div className='card-body '>
                <SearchForm handleGetProducts={handleGetProducts}/> 
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th >checked</th>
                            </tr>
                            </thead>
                            <tbody>
                                {/* il faut tjr donner un id unique lors de la boucle en utilisant map pour identifier l element , il lui permet de mieux gerer son DOM Virtual */}
                                {state.products.map((product)=>(
                                    <tr key={product.id}> 
                                        <td> {product.id}</td>
                                        <td> {product.name}</td>
                                        <td> {product.price}</td>
                                        {/* <td > {product.checked}</td> */}
                                        <td>
                                            <button onClick={()=>handleCheckProduct(product)} className='btn btn-outline-success'>
                                            <FontAwesomeIcon icon={product.checked? faCheckCircle:faTimes}></FontAwesomeIcon>
                                            </button>
                                        </td>

                                        <td>
                                            <button onClick={()=>handleDeleteProduct(product)} className='btn btn-outline-danger'>
                                                <FontAwesomeIcon icon ={faTrash}></FontAwesomeIcon>
                                            </button>
                                        </td>
                                        <td>
                                        {/* on va naviguer vers le composant de Editer produit avec le givven id  */}
                                            <button onClick={()=>navigate(`/editProduct/${product.id}`)} className='btn btn-outline-success'>
                                                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                            </button>
                                        </td>


                                    </tr>
                                ))}

                            </tbody>
                    
                </table>
                <ul className='nav nav-pills'>
  {/* Créez un tableau ayant une longueur de nos pages , chaque index represente une page , avec un mappage de chaque page avec un index  */}
  {Array.from({ length: state.totalPages }, (_, index) => (
    <li key={index}>
         {/* pour souligner la page courrante dans laquel on est  */}
      <button onClick={()=>handleGoToPage(index+1)} className={index+1 == state.currentPage?`btn btn-info ms-1`:`btn btn-info-outline ms-1`}> 
        {index+1 }
      </button>
    </li>
  ))}
</ul>

            </div>
        </div>
    </div>
</div>
)
}
