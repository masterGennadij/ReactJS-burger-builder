import React from 'react';
import classes from './Button.css';

const button = (props) => { 
    const clickHandler = props.clicked || null;   
    return (
        <button 
            className={[classes.Button, classes[props.buttonType]].join(' ')} 
            onClick={clickHandler} >{props.children}</button>
    )
}

export default button;