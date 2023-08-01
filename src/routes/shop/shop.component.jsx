import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.contex";
import ProductCard from "../../components/product-card/product-card.compent";
import './shop.styles.scss'
const Shop = () => {
    const {products} = useContext(ProductsContext)
    return (
        <div className="product-container">
{products.map((product) =>
    <div key={product.id} >
        <ProductCard product={product} />
    </div>


    )}
    </div>
        );
  };

  export default Shop
  