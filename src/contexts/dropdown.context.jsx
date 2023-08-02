import { createContext, useEffect, useState } from 'react';

export const DropDownContext = createContext();

const removeItem = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => {
    console.log('This is Cart Item ID : ', cartItem.id);
    console.log('This is Product To Delete ID : ', productToRemove.id);
    return cartItem.id !== productToRemove.id;
  });
};
const incrementItem = (cartItems, productToAdd) => {
  return cartItems.map((cartItem) => {
    return cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem;
  });
};
const addCartItems = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id;
  });
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const decrementItem = (cartItems, productToRemove) => {
  if (productToRemove.quantity <= 1) {
    return removeItem(cartItems, productToRemove);
  }
  return cartItems.map((cartItem) => {
    return cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};
export const DropDownProvider = ({ children }) => {
  const [activeDropDown, setActiveDropDown] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const addItemToCart = (productToAdd) => {
    console.log('Add item to cartt');
    setCartItems(addCartItems(cartItems, productToAdd));
  };
  const removeFromCart = (productToRemove) => {
    console.log('WORKEDDD');
    setCartItems(removeItem(cartItems, productToRemove));
  };
  const addItemQuantity = (productToAdd) => {
    setCartItems(incrementItem(cartItems, productToAdd));
  };
  const minItemQuantity = (productToRemove) => {
    setCartItems(decrementItem(cartItems, productToRemove));
  };
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    setCartTotal(newCartTotal);
  }, [cartItems]);

  const valueToShare = {
    activeDropDown,
    setActiveDropDown,
    cartItems,
    addItemToCart,
    cartCount,
    removeFromCart,
    addItemQuantity,
    minItemQuantity,
    cartTotal,
  };
  return (
    <DropDownContext.Provider value={valueToShare}>
      {children}
    </DropDownContext.Provider>
  );
};
