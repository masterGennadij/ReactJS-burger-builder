import React, {Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';
//import classes from './Modal.css';

class OrderSummary extends Component  { 
    render(){
        const summaryIngredients = Object.keys(this.props.ingredients)
        .map(ingredient=> {
            return(
                <li key={ingredient}>
                    <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {this.props.ingredients[ingredient]}
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
            <p><strong>Total price: {this.props.total}</strong></p> 
            <p>Continue to checkout?</p> 
            <Button clicked={this.props.modalClose} buttonType="Danger">Cancel</Button>
            <Button clicked={this.props.checkout} buttonType="Success">Checkout</Button>
        </Auxiliary>
        );
    }
}
export default  OrderSummary;