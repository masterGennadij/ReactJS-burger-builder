import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
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
           <p><strong>Total price: {props.total}</strong></p> 
           <p>Continue to checkout?</p> 
           <Button clicked={props.modalClose} buttonType="Danger">Cancel</Button>
           <Button clicked={props.checkout} buttonType="Success">Checkout</Button>
       </Auxiliary>
    );
}

export default orderSummary;