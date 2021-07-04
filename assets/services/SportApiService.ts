import { GenericApiService } from "./GenericApiService";

export class SportApiService extends GenericApiService {
    constructor() {
        super('sports');
    }
}