import { useContext } from 'react';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';
import { DropDownContext } from '../../contexts/dropdown.context';

import { Link, useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  const { cartItems } = useContext(DropDownContext);
  const navigate = useNavigate();
  const goToCheckOutHandler = () => {
    navigate('/checkout');
  };
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>

      <Button onClick={goToCheckOutHandler}>Buy</Button>
    </div>
  );
};
export default CartDropdown;
