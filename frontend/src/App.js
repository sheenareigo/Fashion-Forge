import React from 'react';
import { Routes, Route, useNavigate  } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword'
import Infos from './pages/Infos';
import { useUserContext } from './contexts/UserContext';
import { useSearchContext } from './contexts/SearchContext';
import Search from './pages/Search';
import Product from './pages/Product';
//import useGetUserRole from './hooks/useGetUserRole';

const App = () => {

  const { currentUser } = useUserContext();
  // const { search, canSearch } = useSearchContext();
  const Navigate = useNavigate();
  //const [admin] = useGetUserRole(currentUser);
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ChangePassword />} />
        <Route path='/infos' element={currentUser ? <Infos /> : <Navigate to='/' />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<Navigate to='/' />} />
   
      </Routes>
      <Footer />
    </>
  )
}

export default App;