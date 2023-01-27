import MainRoutes from './routes';
import ToastContain from './components/UI/ToastContain';
import { useDispatch } from 'react-redux';
import { handleAuthentication, handleLogout } from './redux/slice/userSlice';
import { useEffect, useState } from 'react';
import ModalNotification from './components/UI/ModalNotification';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTokenLocalStorage } from '~/util/handleLocalStorage';

function App() {
  const dispatch = useDispatch();
  const [errAuthen, setErrAuthen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === '/log-in' ||
      location.pathname === '/register' ||
      location.pathname === '/authentication'
    ) {
      return;
    }
    dispatch(handleAuthentication())
      .unwrap()
      .catch((err) => {
        console.log(err);
        if (
          err.message &&
          err.message !== 'jwt expired' &&
          getTokenLocalStorage()
        ) {
          setErrAuthen(true);
        }
      });
  }, [dispatch, location.pathname]);

  const handleErrAuthen = () => {
    dispatch(handleLogout());
    setErrAuthen(false);
    navigate('/log-in');
  };

  return (
    <div className="App">
      <MainRoutes />
      {errAuthen && (
        <ModalNotification
          title="Có lỗi trong quá trình đăng nhập"
          des="Vui lòng đăng nhập lại tài khoản của bạn"
          onHandleClick={handleErrAuthen}
        />
      )}
      <ToastContain />
    </div>
  );
}

export default App;
