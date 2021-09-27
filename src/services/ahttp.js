import axios from 'axios'

let ahttp = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default ahttp
