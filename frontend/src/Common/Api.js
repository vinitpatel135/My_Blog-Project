import axios from "axios"

class Api{
    constructor(){
        this.baseUrl = "http://localhost:5000"
    }
    getToken(){
        return localStorage.getItem("token")
    }
    signup(data){
        return axios.post(`${this.baseUrl}/user/create`, data)
    }
    singin(data){
        return axios.post(`${this.baseUrl}/user/login`, data)
    }
    addPost(data){
        const token = this.getToken()
        return axios.post(`${this.baseUrl}/post/add`, data, { headers: { token: token } })
    }
    listAllPost(){
        return axios.get(`${this.baseUrl}/post/`)
    }
    listUserPost(id){
        const token = this.getToken()
        return axios.get(`${this.baseUrl}/post/userpost/${id}`, { headers: { token: token } })
    }
    editPost(id, data){
        const token = this.getToken()
        return axios.put(`${this.baseUrl}/post/edit/${id}`, data, { headers: { token: token } })
    }
    deletePost(id){
        const token = this.getToken()
        return axios.delete(`${this.baseUrl}/post/delete/${id}` , { headers: { token: token } })
    }
}

const api = new Api()
export default api