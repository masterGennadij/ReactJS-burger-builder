import React, {Component} from 'react';
import { connect } from 'react-redux';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/';

class ContactData extends Component  { 
   state = {
       orderForm: {
           name: {
               elementType: 'input',
               valueType: 'name',
               elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
               },
               value: '',
               validation: {
                   required: true
               },
               valid: false,
               touched: false
            },
            email: {
                valueType: 'email',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {                    
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            street: {
                valueType: 'street',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                valueType: 'zip code',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your postal code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                valueType: 'country',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },   
            deliveryMethod: {
                valueType: 'deliveryMethod',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'cheapest'
                        }
                    ]
                },
                value: '',
                validation: {                   
                },
                valid: true,
            }    
       },
       formIsValid: false
   }
   orderHandler = (event) => {
       event.preventDefault(); 
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {         
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData    
        }   
        this.props.purchaseBurgerStart(order); 
   }
   inputChangeHandler = (event, inputIdentifier) => {      
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }
        updatedFormElement.touched = true;
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }    
        this.setState({orderForm:updatedOrderForm, formIsValid: formIsValid});
   }
   checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
   }
    render(){ 
        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = ( <form onSubmit={this.orderHandler}>
                 {
                     formElementsArray.map(formElement=>(
                        <Input 
                            valueType={formElement.config.valueType}
                            shouldValidate={formElement.config.validation}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)}
                            /> 

                     ))
                 }
                   <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
               </form>)  ;
        if (this.props.loading){
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        loading: state.loading
    }
}

const mapDispathToProps = dispatch => {
    return {
       onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)) 
    }
}

export default  connect(mapStateToProps, mapDispathToProps)(withErrorHandler(ContactData, axios));