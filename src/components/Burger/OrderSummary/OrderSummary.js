import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
//import classes from './Modal.css';

const orderSummary = (props) => {
    const summaryIngredients = Object.keys(props.ingredients)
    .map(ingredient=> {
        return(
            <li key={ingredient}>
                <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {props.ingredients[ingredient]}
             </li>
        )
    })
    return (
       <Auxiliary> 
           <h3> Your order </h3>
           <p> a delicious burger with following ingredients: </p>
           <ul> 
               { summaryIngredients }               
           </ul>
           <p>Continue to checkout?</p> 
       </Auxiliary>
    );
}

export default orderSummary;