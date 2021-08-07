import axios from "axios";
import { GenericApiService } from "./GenericApiService";

export class SportApiService extends GenericApiService {
    constructor() {
        super('sports');
    }
    getNoDeletedSport(){
        const url = `${this.baseUrl}?isDeleted=false`;
        return axios.get(url).then(r=>r.data['hydra:member']) 
    }
}