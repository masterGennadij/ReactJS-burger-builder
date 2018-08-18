import React, {Component} from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import * as actions from '../../store/actions/';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.css'

class Orders extends Component {
   
    componentDidMount(){   
        this.props.onFetchOrders(); 
    }
    render(){      
        let orders = <Spinner/>;
        if(!this.props.loading){
            orders = (
                <div>
                    {
                        this.props.orders.map(order=>(<Order 
                                key={order.id}
                                ingredients={order.ingredients}
                                price={+order.price} 
                                id={order.id}   
                                />)
                        )
                    } 
                </div>            
            ) 
        }
        return (
            <div className={classes.Orders}> 
                <h2> Your orders: </h2>
                {orders} 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));