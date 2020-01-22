import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import Home from './components/home';
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/register';
import Dashboard from './components/UserPrivate';
import Shop from './components/Shop';
import UserCart from './components/User/cart';
//make the private and public routes
import Auth from './hoc/auth';

import AddProduct from './components/User/Admin/add_product';
import ManageCategories from './components/User/Admin/manage_categories';

import Product from './components/product';
const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route
          path='/product_detail/:id'
          exact
          component={Auth(Product, null)}
        />
        <Route path='/user/cart' exact component={Auth(UserCart, true)} />
        <Route path='/user/dashboard' exact component={Auth(Dashboard, true)} />
        <Route
          path='/admin/add_product'
          exact
          component={Auth(AddProduct, true)}
        />
        <Route
          path='/admin/manage_categories'
          exact
          component={Auth(ManageCategories, true)}
        />
        <Route path='/register' exact component={Auth(Register, false)} />
        <Route
          path='/register_login'
          exact
          component={Auth(RegisterLogin, false)}
        />
        <Route path='/shop' exact component={Auth(Shop, null)} />
        <Route path='/' exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;

//react slick is for sliders
//react dropzone is for droping files to the page
// react images for displaying the pictures
// react moment for the moment date library.
//react-paypal-express-checkout, is React component that renders Paypal's express check out button
