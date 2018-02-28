import axios from 'axios';

const orderInstance = axios.create({
    baseURL: 'https://makeev-burger-builder.firebaseio.com/'
});

export default orderInstance;