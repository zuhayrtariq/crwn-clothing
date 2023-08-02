import { createContext, useState } from 'react';
import PRODUCTS from '../shop-data.json';
export const ProductsContext = createContext({
  products: [],
});
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const valueToShare = { products, setProducts };
  return (
    <ProductsContext.Provider value={valueToShare}>
      {children}
    </ProductsContext.Provider>
  );
};
