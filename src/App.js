import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductList } from './pages/ProductList.js'
import { AddProduct } from './pages/AddProduct';


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/addProduct' element={<AddProduct />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
