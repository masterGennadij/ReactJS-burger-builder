import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import ContactData from '../Checkout/ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
//import classes from './Checkout.css';

class Checkout extends Component  { 
    state = {
        ingredients : {},
        price: 0
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {  
            if(param[0] === 'price'){
                totalPrice = param[1];
            }  else {
              ingredients[param[0]] = +param[1]   
            }        
                      
        }  
        this.setState({ingredients:ingredients, totalPrice:totalPrice});

    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render(){        
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.url+'/contact-data'} 
                       render={(props)=>(<ContactData {...props} ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/>)}  />   
            </div>
        );
    }
}
export default  Checkout;