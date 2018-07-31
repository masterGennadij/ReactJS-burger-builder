import React, {Component} from 'react';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.css'

class Orders extends Component {
    state = {
        loading: true,
        orders:[]
    }
    componentDidMount(){      
        axios.get('/orders.json')
        .then(response => {
            const fetchedOrders = [];
            for(let key in response.data){             
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            this.setState({orders:fetchedOrders, loading: false}); 
        })
        .catch(error=>{
            console.log('error', error)
            this.setState({loading: false});  
        })
    }
    render(){      
        let orders = (
            <div>
                {
                    this.state.orders.map(order=>(<Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price} 
                            id={order.id}   
                            />)
                    )
                } 
            </div>            
        )
        if(this.state.loading){
            orders = <Spinner/>; 
        }
        return (
            <div className={classes.Orders}> 
                <h2> Your orders: </h2>
                {orders} 
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);