import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './SiteDrawer.css';



const siteDrawer = (props) => {
    const statusClass = (props.isOpen)?classes.Open:classes.Close;
    return (     
        <Auxiliary>
            <Backdrop 
                show={props.isOpen} 
                clicked={props.closedHandler}/>                    
            <div className={[classes.SideDrawer, statusClass].join(' ')}>
                <div className={classes.Logo}> 
                <Logo />    
                </div>     
                <nav> 
                    <NavigationItems />
                </nav>    
            </div>           
        </Auxiliary>

    )
}

export default siteDrawer;