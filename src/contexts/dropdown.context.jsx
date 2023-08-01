import { createContext, useState } from "react";

export const DropDownContext = createContext()

export const DropDownProvider = ({children}) =>{
    const [activeDropDown, setActiveDropDown] = useState(false);
    const valueToShare = {
        activeDropDown,setActiveDropDown
    }
    return(
        <DropDownContext.Provider value={valueToShare}>{children}</DropDownContext.Provider> 
    )
}