import { useContext } from 'react';
import { DropDownContext } from '../../contexts/dropdown.context';

const CheckOut = () => {
  const handleDeleteItemClick = (productToDelete) => {
    removeFromCart(productToDelete);
  };
  const handleAddItemClick = (productToAdd) => {
    addItemQuantity(productToAdd);
  };
  const handleRemoveItemClick = (productToDelete) => {
    minItemQuantity(productToDelete);
  };
  const { cartItems, removeFromCart, addItemQuantity, minItemQuantity } =
    useContext(DropDownContext);
  console.log(cartItems);
  return cartItems.map((cartItem) => {
    return (
      <div key={cartItem.id}>
        <img src={cartItem.imageUrl} alt='' />
        <span>{cartItem.name}</span>
        <hr />
        <button onClick={() => handleRemoveItemClick(cartItem)}> - </button>

        <span>{cartItem.quantity}</span>
        <button onClick={() => handleAddItemClick(cartItem)}> + </button>
        <hr />
        <span>{cartItem.price * cartItem.quantity}</span>
        <button onClick={() => handleDeleteItemClick(cartItem)}> X </button>
      </div>
    );
  });
};
export default CheckOut;
