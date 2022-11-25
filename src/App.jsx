import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { axiosPost } from "./libs/axios";
import { isLoginState, userInfoState } from "./libs/atoms";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";

function App() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const location = useLocation();

  useEffect(() => {
    if (isLogin) {
      axiosPost({
        url: "/auth/me",
      }).then((response) => {
        setUserInfo(response.code === "000" ? response.data : {});
        setIsLogin(response.code === "000");
        location.key = response.code === "000" ? null : location.key;
      });
    }
  }, [location, isLogin, setUserInfo, setIsLogin]);

  return (
    <>
      {isLogin ? (
        <Routes>
          <Route path='/:test' element={<Main />} />
          <Route path='/' element={<Main />} />
        </Routes>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
