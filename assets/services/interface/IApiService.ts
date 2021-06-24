export interface IApiService {
    read(id: string): Promise<any>;
    list(pagination: any, filters: any, sorter: any): Promise<any>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    delete(id: string): Promise<any>;
}