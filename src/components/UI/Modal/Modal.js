import React, {Component} from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';


class Modal extends Component  {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || this.props.children !== nextProps.children;
    }
    render(){
        return (
            <Auxiliary>
            <Backdrop 
                show={this.props.show}
                clicked={this.props.modalClose}/>    
            <div className={classes.Modal}
                style={{
                    opacity:+this.props.show,
                    transform: this.props.show?'translateY(0)':'translateY(-100vh)'
                }}>
                {this.props.children}
            </div>        
            </Auxiliary>
        );
    }
}
export default Modal;