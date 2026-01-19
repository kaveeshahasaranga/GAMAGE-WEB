import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <div className='container mx-auto'>
          <Outlet />
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
