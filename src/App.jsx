import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { axiosPost } from "./libs/axios";
import { isLoginState, userInfoState } from "./libs/atoms";
import Signin from "./pages/signin/Signin";
import Main from "./pages/main/Main";

function App() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/signin") {
      axiosPost({
        url: "/auth/me",
      }).then((response) => {
        setIsLogin(response.code === "000");
        setUserInfo(response.code === "000" ? response.data : {});
        if (response.code !== "000") {
          navigate("/signin", { state: { referrer: location.pathname } });
        }
      });
    }
  });

  return (
    <>
      {isLogin ? (
        <Routes>
          <Route path='/:test' element={<Main />} />
          <Route path='/' element={<Main />} />
        </Routes>
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
