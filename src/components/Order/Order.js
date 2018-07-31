import React from 'react';

import classes from './Order.css';

const order  = (props) => { 
    const ingredients = [];
    for (let ingredientName in props.ingredients){
        if(props.ingredients[ingredientName]){
          ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })  
        }        
    }

    const ingrediendOutput = ingredients.map(ingredient => {
        return <li key={ingredient.name}>{ingredient.name} <strong>{ingredient.amount} </strong> </li>
    })

    return(
    <div className={classes.Order}> 
        <div>
             <p className={classes.id}><strong>ID: </strong>{props.id}</p>
             <h4>Ingredients: </h4>
             <ul>
                 {ingrediendOutput}
             </ul>
        </div>
        <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
)
}

export default order;