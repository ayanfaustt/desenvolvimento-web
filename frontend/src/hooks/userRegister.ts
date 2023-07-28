import axios from 'axios'

export const CreateUser = (username: string, data: object) => {
    
    var url = `http://localhost:8000/user/create/${username}`
    return axios.post(url, data)
    
}