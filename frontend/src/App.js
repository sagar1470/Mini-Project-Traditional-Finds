
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import SummaryApi from './common';
import Context from './context';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';

function App() {
   const dispatch = useDispatch();

  const fetchUserDetails = async ()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method: SummaryApi.current_user.method,
      credentials : "include",  
    })

    const ApiReturnData = await dataResponse.json();
    if(ApiReturnData.success){
      dispatch(setUserDetails(ApiReturnData.data))
    }
  }
  useEffect(()=>{
    // user Details
    fetchUserDetails();

  }, [])


  
  return (
    <>
    <Context.Provider value = {{
        fetchUserDetails // user details fetch 
    }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
      
      <Header />
      <main className='min-h-[calc(100vh-100px)]'>
        <Outlet />
      </main>
      <Footer />

      </Context.Provider>
    </>
  );
}

export default App;
