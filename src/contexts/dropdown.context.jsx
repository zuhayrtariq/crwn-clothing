import { createContext, useEffect, useState } from "react";

export const DropDownContext = createContext()
const addCartItems = (cartItems,productToAdd) =>{

    const existingCartItem = cartItems.find((cartItem) =>{
        return cartItem.id === productToAdd.id
    })
    if(existingCartItem)
    {
        return cartItems.map((cartItem) =>(
            cartItem.id === productToAdd.id ? {...cartItem,quantity: cartItem.quantity + 1} : cartItem
            ))
    }

return [...cartItems,{...productToAdd,quantity: 1}]
}
export const DropDownProvider = ({children}) =>{
    const [activeDropDown, setActiveDropDown] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0)
    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItems(cartItems,productToAdd))
    }

    useEffect(() =>{
        const newCartCount = cartItems.reduce((total,cartItem)=>(total+cartItem.quantity),0);
      
        setCartCount(newCartCount)
    },[cartItems])

    const valueToShare = {
        activeDropDown,setActiveDropDown,
        cartItems,
        addItemToCart,
        cartCount
    }
    return(
        <DropDownContext.Provider value={valueToShare}>{children}</DropDownContext.Provider> 
    )
}