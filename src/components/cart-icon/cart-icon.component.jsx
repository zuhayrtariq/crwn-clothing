import { useContext } from 'react'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
import { DropDownContext } from '../../contexts/dropdown.context'


const CartIcon = () =>
{ 
    const {activeDropDown, setActiveDropDown,cartCount} = useContext(DropDownContext);
    const toggleDropDown = () =>
    {
        
        setActiveDropDown(!activeDropDown)
    }

    return(
<div className="cart-icon-container" onClick={toggleDropDown}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{cartCount}</span>
</div>)
}
export default CartIcon