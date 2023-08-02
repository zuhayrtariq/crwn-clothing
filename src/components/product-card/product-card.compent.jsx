import { useContext } from 'react';
import Button from '../button/button.component';
import './product-card.styles.scss'
import { DropDownContext } from '../../contexts/dropdown.context';


const ProductCard = ({product}) =>{
    const {addItemToCart} = useContext(DropDownContext);
    const addProductToCard = () =>{
        addItemToCart(product)
    }
    return(
        <div className="product-card-container">
            <img src={product.imageUrl} alt="Product Image ALT" />
        <div className="footer">
            <span className="name">{product.name}</span><span className="price">{product.price}</span>
        </div>

        <Button buttonType='inverted' onClick={addProductToCard} >Add to Cart</Button>
        </div>
    )

}
export default ProductCard;