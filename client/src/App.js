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


const App = () => {
  const [apiStation, setApiStation] = useState([]);

  const getApiStation = async (station) => {
    setApiStation(station);
  }

  // console.log(apiStation);

  return (
    <div className="p-0 h-[59rem] w-screen bg-cardBlack">

      {/* <div className='h-[100%]'> */}
      <TwoButtons />
      <SearchForm />
      <Routes>
        <Route path='/' element={<ListStations getApiStation={getApiStation} />} />
        <Route path='/map' element={<Map />} />
        <Route path='/user' element={<UserPage />} />
        {/* <Route path='/apiStation/:id' element={<Station apiStation={apiStation} />} /> */}
      </Routes>
      <div className='fixed bottom-1 w-full p-2 bg-cardBlack'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
