import axios from 'axios'

export const LoginUser = (username: string, data: object) => {
    
    var url = `http://localhost:8000/login`
    return axios.post(url, data)
    
}