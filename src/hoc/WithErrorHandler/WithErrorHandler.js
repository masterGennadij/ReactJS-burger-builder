import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request
            }, error => {
                this.setState({error: error});
                return Promise.reject(error)
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
                 return Promise.reject(error)
            });
        }
        componentWillUnmout() {
            axios.interceptors.request.reject(this.reqInterceptor);
            axios.interceptors.response.reject(this.resInterceptor);
        }
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
        render() {
            return (
                <Auxiliary>
                    <Modal 
                        modalClose={this.errorConfirmedHandler}
                        show={this.state.error?true:false}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
        );
    }    
}
}

export default withErrorHandler;