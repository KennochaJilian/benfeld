import axios from "axios"

export class AuthApiService{

    login(values){
        const url = `login_check`
        return axios.post(url, values).then(r => r.data)
    }

}