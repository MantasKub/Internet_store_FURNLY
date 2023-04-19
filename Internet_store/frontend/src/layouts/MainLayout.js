import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import Loading from '../components/loading/Loading';
import Message from '../components/message/Message';
import MainContext from '../context/MainContext';
import SideBar from '../components/sideBar/SideBar';
import './MainLayout.css';
import Footer from '../components/footer/Footer';

function MainLayout(props) {

  const navigation = useLocation();
  const { setMessage } = useContext(MainContext);

  useEffect(() => {
    setMessage(false);
  }, [navigation]);

  return (
    <>
      <Loading />
      <Header />
      <div className="main d-flex">
        <SideBar />
        <div className="container mt-3 ms-5 me-5">
          <Message />
          {props.children}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MainLayout;