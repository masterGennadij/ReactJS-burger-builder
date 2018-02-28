import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {
    state = {
        sideDrawerIsOpen:false
    }
    sideDrawerClosedHandler = () => {
        this.setState({sideDrawerIsOpen:false});
    }
    sideDrawerOpenHandler = () => {
        this.setState({sideDrawerIsOpen:true});
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState)=>{
            return {sideDrawerIsOpen:!prevState.sideDrawerIsOpen}
        });
    }
    render(){
        return(
            <Auxiliary>
                <Toolbar                    
                    toggleHandler={this.sideDrawerToggleHandler}/> 
                <SideDrawer 
                    closedHandler={this.sideDrawerClosedHandler}
                    isOpen={this.state.sideDrawerIsOpen}/>
                <main className={classes.Content}> 
                    {this.props.children}
                </main>    
            </Auxiliary>
        );
    }
}
export default Layout;