import axios from "axios";
import { GenericApiService } from "./GenericApiService";

export class RoomApiService extends GenericApiService {
    constructor() {
        super('rooms');
    }
    getNoDeletedRooms(){
        const url = `${this.baseUrl}?isDeleted=false`;
        return axios.get(url).then(r=>r.data['hydra:member']) 
    }
}