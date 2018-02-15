import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
    const controlPanel = controls.map(control => 
        <BuildControl
            disabled={props.disabled[control.type]}
            less={() => props.ingredientRemoved(control.type)} 
            more={() => props.ingredientAdded(control.type)}
            key={control.label}
            label={control.label}/>
    );
    return (
        <div className={classes.BuildControls}>           
            {controlPanel}
            <p>Total price: <strong>{props.price.toFixed(2)}</strong> </p>
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>Order now</button>
        </div>
    );
}

export default buildControls;