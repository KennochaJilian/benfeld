import { useState } from "react";

interface IResponsiveData{
    isPhone: boolean, 
    isDesktop: boolean,
}

export class ResponsiveContext {
    responsiveData : IResponsiveData
    setResponsiveData: React.Dispatch<React.SetStateAction<IResponsiveData>>;
    mediaTablett: number;
    mediaPhone: number; 
    constructor() {
        [this.responsiveData, this.setResponsiveData] = useState<IResponsiveData>({isDesktop:true, isPhone:false});
        this.mediaTablett = 1024;
        this.mediaPhone = 769
    }

}

export default ResponsiveContext;
