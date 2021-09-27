import axios from "axios";

export const login = user=> new Promise((resolve, reject) => {
    axios.post('http://localhost:3000/api/v1/auth/login', user).then(resp=>{
        const token = resp.data.token;
        localStorage.setItem('user-token', token);
        resolve(resp)
    }).catch(err=> {
        localStorage.removeItem('user-token');
        reject(err);
    })
})