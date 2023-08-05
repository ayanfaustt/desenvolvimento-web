import axios from 'axios'

export const CreateSummaries = (userId: number, data: object) => {
    
    var url = `http://localhost:8000/summaries/create/${userId}`
    return axios.post(url, data)
    
}