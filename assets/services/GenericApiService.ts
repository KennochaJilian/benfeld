import axios from 'axios';
import { IApiService } from './interface/IApiService';

export class GenericApiService implements IApiService {
    constructor(protected baseUrl: string) {

    }

    listBase(url: any, pagination: any, filters: any, sorter: any) {
        return axios.get(url).then(r => r.data['hydra:member'])
    }

    read(id: string): Promise<any> {
        return axios.get(`${this.baseUrl}/${id}/`).then(r => r.data['hydra:member']);
    }

    list(pagination: any = null, filters: any = null, sorter: any = null): Promise<any> {
        return this.listBase(`${this.baseUrl}/`, pagination, filters, sorter);
    }

    create(data: any): Promise<any> {
        return axios.post(`${this.baseUrl}/`, data).then(r => r.data['hydra:member']);
    }
    update(id: string, data: any): Promise<any> {
        return axios.patch(`${this.baseUrl}/${id}/`, data).then(r => r.data['hydra:member']);
    }
    delete(id: string): Promise<any> {
        return axios.delete(`${this.baseUrl}/${id}/`).then(r => r.data['hydra:member']);
    }
}
