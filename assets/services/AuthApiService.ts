import axios from "axios"

export class AuthApiService{

    login(values){
        const url = `login_check`
        return axios.post(url, values).then(r => r.data)
    }
    me(){
        const url = `users/me`
        return axios.get(url).then(r => r.data)        
    }

    register(values){
        const url = `register`
        return axios.post(url, values).then(r => r.data)
    }

}