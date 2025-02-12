import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Navbar from './components/Navbar';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
