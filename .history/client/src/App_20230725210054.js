import ListStations from './pages/components/ListStations';
import Footer from './pages/components/Footer';
import Header from './pages/components/Header';
import { Routes, Route } from 'react-router-dom';
import Map from './pages/components/Map';
import UserPage from './pages/components/UserPage';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import TwoButtons from './pages/components/TwoButtons';
import { useSelector } from 'react-redux';
import SignupForm from './pages/components/SignupForm';
import LoginForm from './pages/components/LoginForm';
import MyFavoriteStations from './pages/components/MyFavoriteStations';
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  const { allStations } = useSelector((state) => state.userReducer);
  const [apiStation, setApiStation] = useState([]);

  const getApiStation = async (station) => {
    setApiStation(station);
  }

  return (
    // <div className="p-0 h-[59rem] w-screen ">
    <div className=' h-[100vh] parent bg-cardBlack'>
      {/* <div className='h-[100%]'> */}

      <TwoButtons />
      <div className=''>
        <Header />
      </div>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <div>
        <Routes>
          <Route path='/' element={<ListStations getApiStation={getApiStation} />} />
          <Route path='/userpage' element={<UserPage />} />
          <Route path='/favoriteStations' element={<MyFavoriteStations />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/signin' element={<LoginForm />} />
          <Route path='/listStations' element={<ListStations getApiStation={getApiStation} />} />
          <Route path='/map' element={<Map />} />
          <Route path='/user' element={<UserPage />} />
        </Routes>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
