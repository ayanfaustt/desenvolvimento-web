import axios from 'axios'

export const CreateSummaries = (username: number, data: object) => {
    
    var url = `http://localhost:8000/summaries/create/${username}`
    return axios.post(url, data)
    
}