import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BuilderBuilder';
import Checkout from './containers/Checkout/Checkout';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
export const App = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();

  return (
    <div>
      <Layout>
        <Routes>
          <Route
            path='/checkout'
            element={
              <Checkout
                location={location}
                navigate={navigate}
                params={params}
              />
            }
          />
          <Route
            path='/'
            exact
            element={
              <BurgerBuilder
                location={location}
                navigate={navigate}
                params={params}
              />
            }
          />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
