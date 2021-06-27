import { GenericApiService } from "./GenericApiService";

export class UserApiService extends GenericApiService {
    constructor() {
        super('users');
    }
}