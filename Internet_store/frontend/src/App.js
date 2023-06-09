import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Layout
import MainLayout from './layouts/MainLayout';
//Context(useState naudojimas visame projekte)
import MainContext from './context/MainContext';
//Pages
import Products from './pages/Products';
import Order from './pages/Order';
import AdminProducts from './pages/admin/Products';
import NewProduct from './pages/admin/ProductNew';
import EditProduct from './pages/admin/ProductEdit';
import Categories from './pages/admin/Categories';
import NewCategory from './pages/admin/CategoriesNew';
import EditCategories from './pages/admin/CategoriesEdit';
import Orders from './pages/admin/Orders';
import Category from './pages/Category';

function App() {

  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  const contextValues = {
    data, setData,
    refresh, setRefresh,
    loading, setLoading,
    message, setMessage
  };
  return (
    <>
      <BrowserRouter>
        <MainContext.Provider value={contextValues}>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/category/:id" element={<Category />} />
              <Route path="/:productId/:productQty" element={<Order />} />
              <Route path="/admin" >
                <Route index element={<AdminProducts />} />
                <Route path="new-product" element={<NewProduct />} />
                <Route path="edit-product/:id" element={<EditProduct />} />
                <Route path="categories" element={<Categories />} />
                <Route path="new-category" element={<NewCategory />} />
                <Route path="edit-category/:id" element={<EditCategories />} />
                <Route path="orders" element={<Orders />} />
              </Route>
            </Routes>
          </MainLayout>
        </MainContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
