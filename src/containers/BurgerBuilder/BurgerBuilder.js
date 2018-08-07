import React, {Component} from 'react';

import axios from '../../axios-orders';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

    state = {         
        purchasing: false,
        loading: false, 
        error: false
    }
    componentDidMount(){
        /*axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients:response.data});            
        })
        .catch(error=>{
            this.setState({error:true});  
        })*/
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
        return sum>0;      
    }
    
   purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () => {      
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo) {            
                disabledInfo[key] = disabledInfo[key] <= 0;            
        }
        let orderSummary = <OrderSummary 
            total={this.props.price.toFixed(2)}
            ingredients={this.props.ings}
            modalClose={this.purchaseCancelHandler}
            checkout={this.purchaseContinueHandler}/>
        if(this.state.loading || !this.props.ings){
            orderSummary = <Spinner />
        }            
        let burger = this.state.error?<p>Ingredients cannot be loaded</p>:<Spinner />
        if(this.props.ings){
           burger = (
            <Auxiliary >
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                    price={this.props.price}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}                   
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
        onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));