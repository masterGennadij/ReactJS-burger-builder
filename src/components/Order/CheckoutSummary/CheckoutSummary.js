import React from 'react';

import Burger from '../../../components/Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';



const CheckoutSummary = (props) => {
   
    return (
        <div className={classes.CheckoutSummary}>           
           <h1>We hope it tastes well! </h1>
           <div style={{width:'100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
           </div>   
           <Button 
                clicked={props.checkoutCancelled}
                buttonType="Danger">Cancel</Button> 
           <Button 
                clicked={props.checkoutContinued}
                buttonType="Success">Success</Button> 
        </div>
    );
}

export default CheckoutSummary;