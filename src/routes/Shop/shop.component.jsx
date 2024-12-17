import "./shop.styles.scss";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/categoriesSlice";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const getCategoriesmap = async () => {
      setLoading(true); // Set loading to true when fetching starts
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(setCategories(categoriesArray));
      setLoading(false); // Set loading to false after fetching
    };

    getCategoriesmap();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        // Daisy UI Loading Spinner
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <Routes>
          <Route index element={<CategoriesPreview />} />
          <Route path=":category" element={<Category />} />
        </Routes>
      )}
    </>
  );
};

export default Shop;
