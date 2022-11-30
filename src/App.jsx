import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { axiosPost } from "./libs/axios";
import { isLoginState, userInfoState } from "./libs/atoms";
import { Signin, Signout } from "./pages/sign/Sign";
import Main from "./pages/main/Main";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Gnb from "./layouts/Gnb";
import UserList from "./pages/user/UserList";

function App() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.pathname.startsWith("/sign")) {
      axiosPost({
        url: "/api/auth/me",
      }).then((response) => {
        setIsLogin(response.code === "000");
        setUserInfo(response.code === "000" ? response.data : {});
        if (response.code !== "000") {
          navigate("/signin", { state: { referrer: location.pathname } });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      {isLogin ? (
        <>
          <Header />
          <Gnb />
          <Routes>
            <Route path='/user/list' element={<UserList />} />
            <Route path='/signout' element={<Signout />} />
            <Route path='/' element={<Main />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/*' element={null} />
        </Routes>
      )}
    </>
  );
}

export default App;
