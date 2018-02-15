import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.3,
    cheese: 0.7,
    meat: 1.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        purchasable: false,
        totalPrice:4,
        purchasing: false
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

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {            
                disabledInfo[key] = disabledInfo[key] <= 0;            
        }
        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    price={this.state.totalPrice}
                    ingredientRemoved={this.removeIngredientHandler}
                    ingredientAdded={this.addIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
                <Modal show={this.state.purchasing}> 
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
            </Auxiliary>    
        );
    }
}

export default BurgerBuilder;