import { useContext } from 'react'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import './cart-dropdown.styles.scss'
import { DropDownContext } from '../../contexts/dropdown.context'


const CartDropdown = ()=>{
    const {cartItems}= useContext(DropDownContext)
    return(
        <div className="cart-dropdown-container">
            <div className='cart-items'>
                {cartItems.map((item) =>(
                <CartItem key={item.id} cartItem={item}/>
                ))}
               
           
            </div>
            <Button>Buy</Button>
        </div>
    )

}
export default CartDropdown