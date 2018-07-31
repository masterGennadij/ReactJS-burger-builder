import React, {Component} from 'react';

import axios from '../../axios-orders';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.3,
    cheese: 0.7,
    meat: 1.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        purchasable: false,
        totalPrice:4,
        purchasing: false,
        loading: false, 
        error: false
    }
    componentDidMount(){
        axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients:response.data});            
        })
        .catch(error=>{
            this.setState({error:true});  
        })
    }
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    updatePurchaseState = (ingredients) => {    
        const sum = Object.keys(ingredients)
        .map(ind=>ingredients[ind])
        .reduce((sum, el)=>{
           return sum+el;
        },0);
        this.setState({purchasable: sum>0});      
    }
    addIngredientHandler = (type) => {
        const newValue = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }      
        updatedIngredients[type] = newValue;
        const additionPrice = INGREDIENT_PRICES[type];
        const newPrice =  this.state.totalPrice + additionPrice;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        if (!this.state.ingredients[type] > 0 ) return;
        const newValue = this.state.ingredients[type] - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }      
        updatedIngredients[type] = newValue;
        const deductionPrice = INGREDIENT_PRICES[type];
        const newPrice =  this.state.totalPrice - deductionPrice;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice });
        this.updatePurchaseState(updatedIngredients);
    }
   purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () => {
        /*this.setState({loading:true});
        const order = {
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
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
            this.setState({loading:false, purchasing: false})
        })
        .catch(error => {
            console.log(error);
            this.setState({loading:false, purchasing: false})
        })*/
        //console.log('continue');
        let queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`);
        }
        queryParams.push('price='+ this.state.totalPrice);
        const queryString =  queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: queryString
        });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {            
                disabledInfo[key] = disabledInfo[key] <= 0;            
        }
        let orderSummary = <OrderSummary 
            total={this.state.totalPrice.toFixed(2)}
            ingredients={this.state.ingredients}
            modalClose={this.purchaseCancelHandler}
            checkout={this.purchaseContinueHandler}/>
        if(this.state.loading || !this.state.ingredients){
            orderSummary = <Spinner />
        }            
        let burger = this.state.error?<p>Ingredients cannot be loaded</p>:<Spinner />
        if(this.state.ingredients){
           burger = (
            <Auxiliary >
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    price={this.state.totalPrice}
                    ingredientRemoved={this.removeIngredientHandler}
                    ingredientAdded={this.addIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
                    </Auxiliary >
                    ) 
        }               
      
        return (
            <Auxiliary>
                {burger}
                <Modal 
                show={this.state.purchasing}
                modalClose={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
            </Auxiliary>    
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);