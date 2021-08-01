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
    getUserBookings(userId, status){
        let url = `${this.baseUrl}/${userId}/bookings`;
        if (status){
            url+=`?status=${status}`
        }
        return axios.get(url).then(r=>r.data);
    }
    getNoDeletedUser(){
        const url = `${this.baseUrl}?isDeleted=false`;
        return axios.get(url).then(r=>r.data['hydra:member']) 
    }
    searchByName(value){
        const url = `${this.baseUrl}?isDeleted=false&lastName=${value}`;
        return axios.get(url).then(r=>r.data['hydra:member']) 
    }
    onLogout(){
        localStorage.clear()
        location.reload()
    }
}