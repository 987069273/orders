import React from 'react';
import OrderList from '../OrderList';
import Header from '../Header';
import logo from '../../logo.svg';
import './style.css';

function App() {
  return (
    <div className="app">
      <Header />
      <OrderList />
    </div>
  );
}

export default App;
