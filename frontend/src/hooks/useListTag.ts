import axios from 'axios'

export const TagList = (userId: number) => {
    
    var url = `http://localhost:8000/tags/list/${userId}`
    return axios.get(url)
    
}