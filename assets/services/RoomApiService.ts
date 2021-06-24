import { GenericApiService } from "./GenericApiService";

export class RoomApiService extends GenericApiService {
    constructor() {
        super('rooms');
    }
}