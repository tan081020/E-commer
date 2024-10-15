import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import { useEffect } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './stores/userSlice';


function App() {
  const dispatch = useDispatch()
  const fetchUserDeatails = async()=>{

      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method : SummaryApi.current_user.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()
      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }

      
  }

  useEffect(()=>{
    // user detail
    fetchUserDeatails()

  },[])
  return ( 
    <>
      <Context.Provider value={{
        fetchUserDeatails
      }}>

      <ToastContainer />
        
        <Header></Header>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
            <Outlet></Outlet>
        </main>
        <Footer></Footer>

      </Context.Provider>
        
      
    </>
  );
}

export default App;
