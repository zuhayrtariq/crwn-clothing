import { useContext } from 'react';
import './checkout-item.styles.scss';
import { DropDownContext } from '../../contexts/dropdown.context';

const CheckoutItem = ({ cartItem }) => {
  const { removeFromCart, addItemQuantity, minItemQuantity } =
    useContext(DropDownContext);
  const handleDeleteItemClick = () => {
    removeFromCart(cartItem);
  };
  const handleAddItemClick = () => {
    addItemQuantity(cartItem);
  };
  const handleRemoveItemClick = () => {
    minItemQuantity(cartItem);
  };
  const { imageUrl, name, price, quantity } = cartItem;
  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt='abc' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={handleRemoveItemClick}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={handleAddItemClick}>
          &#10095;
        </div>
      </span>

      <span className='price'>{price * quantity}</span>
      <div className='remove-button' onClick={handleDeleteItemClick}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
