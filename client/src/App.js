import Loader from './components/Loader';
import ListStations from './pages/components/ListStations';
import Footer from './pages/components/Footer';
import SearchForm from './pages/components/SearchForm';
import { Routes, Route, Link } from 'react-router-dom';
import { FaRoute } from 'react-icons/fa';
import { IoMapSharp } from 'react-icons/io5';
import Map from './pages/components/Map';
import UserPage from './pages/components/UserPage';
import Station from './pages/components/Station';
import { useState } from 'react';

const App = () => {
  const [apiStation, setApiStation] = useState([]);

  const getApiStation = async (station) => {
    setApiStation(station);
  }

  return (
    <div className="p-4 h-max-[100vh] w-screen bg-cardBlack">
      <div className='flex gap-4 absolute top-[85%] left-[65%] z-50'>
        <Link to='/map'>
          <div className='bg-green rounded-full h-11 w-11  p-2 items-center flex'>
            <IoMapSharp className='text-white text-3xl ' />
          </div>
        </Link>
        <Link to='/'>
          <div className='bg-green rounded-full h-11 w-11  p-2 items-center flex'>
            <FaRoute className='text-white text-3xl ' />
          </div>
        </Link>
      </div>
      <div className='main'>
        <SearchForm />
        <Routes>
          <Route path='/' element={<ListStations getApiStation={getApiStation} />} />
          <Route path='/map' element={<Map />} />
          <Route path='/user' element={<UserPage />} />
          <Route path='/apiStation/:id' element={<Station apiStation={apiStation} />} />
        </Routes>
        <Footer />
      </div>

    </div>
  );
}

export default App;
