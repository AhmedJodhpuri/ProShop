import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/bootstrap.custom.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  
} from "react-router-dom";
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreens from './screens/ProductScreens';
import { Provider } from 'react-redux';
import { store } from './store';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index ={true} path="/" element={<HomeScreen />}></Route>
      <Route path="/search/:keyword" element={<HomeScreen />}></Route>
      <Route path="/page/:pageNumber" element={<HomeScreen />}></Route>
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />}></Route>
      <Route path="/product/:id" element={<ProductScreens />}></Route>
      <Route path="/cart" element={<CartScreen />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/register" element={<RegisterScreen />}></Route>
      
      <Route path='' element={<AdminRoute />}>
      <Route path="/admin/orderList" element={<OrderListScreen />}></Route>
      <Route path="/admin/productList" element={<ProductListScreen />}></Route>
      <Route path="/admin/productList/:pageNumber" element={<ProductListScreen />}></Route>
      <Route path="/admin/product/:id/edit" element={<ProductEditScreen />}></Route>
      <Route path="/admin/userList" element={<UserListScreen />}></Route>
      <Route path="/admin/user/:id/edit" element={<UserEditScreen/>}></Route>
      </Route>
      
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} /> 
      </Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
  <Provider store ={store}>
    <PayPalScriptProvider deferLoading = {true}>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
    </React.StrictMode>
);

reportWebVitals();
