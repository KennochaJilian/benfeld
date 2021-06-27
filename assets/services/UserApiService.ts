import axios from "axios";
import { GenericApiService } from "./GenericApiService";

export class UserApiService extends GenericApiService{
    constructor() {
        super('users');
    }
    updateUserPassword(userId, passwords){
        const url = `${this.baseUrl}/${userId}/updatePassword`;
        
        return axios.post(url, passwords).then(r => r.data); 
    }
}