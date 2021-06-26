import { useState } from "react";

export class UserContext{
    token: string; 
    setToken:string;

    constructor(){
        [this.token, this.setToken] = useState<string>(); 
    }
}

export default UserContext