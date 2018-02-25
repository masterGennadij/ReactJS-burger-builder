import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';


const modal = (props) => {
    return (
        <Auxiliary>
        <Backdrop 
            show={props.show}
            clicked={props.modalClose}/>    
        <div className={classes.Modal}
            style={{
                opacity:+props.show,
                transform: props.show?'translateY(0)':'translateY(-100vh)'
            }}>
            {props.children}
        </div>        
        </Auxiliary>
    );
}

export default modal;