import Loader from './components/Loader';
import ListStations from './pages/components/ListStations';
import Footer from './pages/components/Footer';
import SearchForm from './pages/components/SearchForm';
import { Routes, Route } from 'react-router-dom';
import Map from './pages/components/Map';
import UserPage from './pages/components/UserPage';
import { Toaster } from 'react-hot-toast';
import Station from './pages/components/Station';
import { useState } from 'react';
import TwoButtons from './pages/components/TwoButtons';
import LoaderPlayer from './components/LoaderPlayer';
import { useSelector } from 'react-redux';
import SignupForm from './pages/components/SignupForm';



const App = () => {
  const { allStations } = useSelector((state) => state.userReducer);
  const [apiStation, setApiStation] = useState([]);

  const getApiStation = async (station) => {
    setApiStation(station);
  }

  // console.log(allStations.station_locator_url.length === 33);

  return (
    // <div className="p-0 h-[59rem] w-screen ">
    <div className=' h-[100vh] bg-cardBlack'>
      {/* <div className='h-[100%]'> */}

      <TwoButtons />
      <SearchForm />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <Routes>
        <Route path='/' element={<ListStations getApiStation={getApiStation} />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/listStations' element={<ListStations getApiStation={getApiStation} />} />
        <Route path='/map' element={<Map />} />
        <Route path='/user' element={<UserPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
