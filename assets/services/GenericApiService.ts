import axios from 'axios';

export class GenericApiService {
    constructor(protected baseUrl: string) {

    }

    listBase(url: any, pagination: any, filters: any, sorter: any) {
        return axios.get(url, {
            params: {
                ...filters,
                ...(sorter?.columnKey ? { ordering: (sorter.order === 'descend' ? '-' : '') + sorter.columnKey } : null),
                ...(pagination?.pageSize ? { limit: pagination.pageSize } : null),
                ...(pagination?.current && pagination?.pageSize ? { offset: (pagination.current - 1) * pagination.pageSize } : null)
            }
        }).then(r => r.data['hydra:member'])
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
