import React from 'react';
import CoinDetailView from './Pages/CoinDetailView';
import Home from './Pages/Home';
import Exchanges from './Pages/Exchanges';
import ExchangeDetailView from './Pages/ExchangeDetailView';
import { Routes, Route, Navigate } from 'react-router-dom';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import { rootURL } from './utils/helpers';

function App() {
  return (
    <div className="App">
      <ResponsiveDrawer>
        <Routes>
          <Route
            path={`${rootURL}cryptocurrencies/:id`}
            element={<CoinDetailView />}
          />
          <Route
            path={`${rootURL}cryptocurrencies`}
            element={<Navigate to="/" replace />}
          />
          <Route path={`${rootURL}exchanges`} element={<Exchanges />} />
          <Route
            path={`${rootURL}exchanges/:id`}
            element={<ExchangeDetailView />}
          />
          <Route path={rootURL} element={<Home />} />
          <Route
            path="*"
            element={<Navigate to="/crypto-asset-reports" replace />}
          />
        </Routes>
      </ResponsiveDrawer>
    </div>
  );
}

export default App;
