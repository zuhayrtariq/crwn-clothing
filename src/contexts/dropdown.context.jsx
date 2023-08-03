import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

export const DropDownContext = createContext();
export const CartActionTypes = {
  TOGGLE_CART_DROPDOWN: 'TOGGLE_CART_DROPDOWN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};
export const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CartActionTypes.TOGGLE_CART_DROPDOWN: {
      return {
        ...state,
        activeDropDown: payload,
      };
    }
    case CartActionTypes.SET_CART_ITEMS: {
      return {
        ...state,
        ...payload,
      };
    }
    default:
      throw new Error(`Unhandled Type ${type} in the cartReducer`);
  }
};
const INITITAL_STATE = {
  activeDropDown: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};
const removeItem = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => {
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
  const [{ activeDropDown, cartItems, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITITAL_STATE);
  const setActiveDropDown = () => {
    dispatch(
      createAction(CartActionTypes.TOGGLE_CART_DROPDOWN, !activeDropDown)
    );
  };

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    dispatch(
      createAction(CartActionTypes.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItems(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const removeFromCart = (productToRemove) => {
    const newCartItems = removeItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };
  const addItemQuantity = (productToAdd) => {
    const newCartItems = incrementItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const minItemQuantity = (productToRemove) => {
    const newCartItems = decrementItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

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
