import React, {Component} from 'react';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component  { 
   state = {
       name: '',
       email: '',
       address: {
           street: '',
           postalCode: ''
       },
       loading: false
   }
   orderHandler = (event) => {
       event.preventDefault();     
        this.setState({loading:true});
        const order = {         
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Alex Makeev',
                email: 'master.gennadij@gmail.com',
                adress: {
                    country: 'Ukraine',
                    zipCode: '69059',
                    street: 'SomeStreet 5'
                }
            },
            deliveryMethod: 'fastest'
        }       
        axios.post('/orders.json', order)
        .then(response => {
            console.log(response);
            this.setState({loading:false});
            this.props.history.push('/orders');
        })
        .catch(error => {
            console.log(error);
            this.setState({loading:false})
        })
   }
    render(){ 
        let form = ( <form>
                   <input className={classes.Input} type="text" name="name" placeholder="Your name" /> 
                   <input className={classes.Input} type="email" name="email" placeholder="Your email" /> 
                   <input className={classes.Input} type="text" name="street" placeholder="Your street" /> 
                   <input className={classes.Input} type="text" name="postalCode" placeholder="Your postal code" /> 
                   <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
               </form>)  ;
        if (this.state.loading){
            form = (<Spinner />);
        }            
        return (
            <div className={classes.ContactData}>
               <h4>Please, enter your contact info:</h4>
                 {form}
            </div>
        );
    }
}
export default  ContactData;