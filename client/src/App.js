import Loader from './components/Loader';
import ListStations from './pages/components/ListStations';
import Footer from './pages/components/Footer';
import SearchForm from './pages/components/SearchForm';
import { Routes, Route } from 'react-router-dom';
import Map from './pages/components/Map';
import UserPage from './pages/components/UserPage';
import Station from './pages/components/Station';
import { useState } from 'react';
import TwoButtons from './pages/components/TwoButtons';
import LoaderPlayer from './components/LoaderPlayer';
import { useSelector } from 'react-redux';


const App = () => {
  const { allStations } = useSelector((state) => state.userReducer);
  const [apiStation, setApiStation] = useState([]);

  const getApiStation = async (station) => {
    setApiStation(station);
  }

  // console.log(allStations.station_locator_url.length === 33);

  return (
    // <div className="p-0 h-[59rem] w-screen bg-cardBlack">
    <div className='bg-cardBlack h-[100vh]'>
      {/* <div className='h-[100%]'> */}
      <TwoButtons />
      <div>
        <SearchForm />
      </div>

      {
        !allStations.station_locator_url ? <div className='h-[100%]'><LoaderPlayer /></div> :
          <div>
            <Routes>
              <Route path='/' element={<ListStations getApiStation={getApiStation} />} />
              <Route path='/map' element={<Map />} />
              <Route path='/user' element={<UserPage />} />
              {/* <Route path='/apiStation/:id' element={<Station apiStation={apiStation} />} /> */}
            </Routes>
          </div>
      }

      <div className='fixed bottom-1 w-full p-2 bg-cardBlack'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
