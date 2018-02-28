import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.css';

const toolbar = (props) => {    
    return (
        <header className={classes.Toolbar}> 
            <DrawerToggle toggleHandler={props.toggleHandler}/>      
            <div className={classes.Logo}> 
              <Logo />    
            </div> 
            <nav className={classes.DesctopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default toolbar;