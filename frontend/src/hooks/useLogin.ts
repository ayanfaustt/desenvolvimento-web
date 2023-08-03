import axios from 'axios'

export const LoginUser = (data: object) => {
    
    var url = `http://localhost:8000/session/login`
    return axios.post(url, data)
    
}