import { createContext, useEffect, useState } from 'react';
import { getCategoryAndDocuments } from '../utils/firebase/firebase.utils';
export const CategoriesContext = createContext({
  categoriesMap: [],
});
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  useEffect(() => {
    const getCategoryMap = async () => {
      const categoryMap = await getCategoryAndDocuments();

      setCategoriesMap(categoryMap);
    };

    getCategoryMap();
  }, []);
  const valueToShare = { categoriesMap, setCategoriesMap };

  return (
    <CategoriesContext.Provider value={valueToShare}>
      {children}
    </CategoriesContext.Provider>
  );
};
