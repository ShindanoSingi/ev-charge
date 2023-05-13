import Loader from './components/Loader';
import ListStations from './pages/components/ListStations';
import Footer from './pages/components/Footer';
import SearchForm from './pages/components/SearchForm';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="p-4 h-min-[100vh] w-screen bg-cardBlack">
      <SearchForm />
      <Routes>
        <Route path='/' element={<ListStations />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
