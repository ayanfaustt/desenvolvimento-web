import axios from 'axios'

export const UserId = (username: string) => {
    
    var url = `http://localhost:8000/user/${username}`
    return axios.get(url)
    
}

