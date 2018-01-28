import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice:4
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
                    disabled={disabledInfo}/>
            </Auxiliary>    
        );
    }
}

export default BurgerBuilder;