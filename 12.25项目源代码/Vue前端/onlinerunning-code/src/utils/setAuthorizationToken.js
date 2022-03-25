import axios from 'axios';

// 设置 请求默认头
const setAuthorizationToken = (token) => {
    if (token) {
        localStorage.setItem('userToken', token);
        axios.defaults.headers.common['Authorization'] = `${token}`;
    }else{
        localStorage.removeItem('userToken');
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthorizationToken;