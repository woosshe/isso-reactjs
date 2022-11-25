import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { axiosPost } from "./libs/axios";
import { isLoginState, userInfoState } from "./libs/recoil";
import Login from "./screens/login/Login";
import Main from "./screens/main/Main";

function App() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    axiosPost({
      url: "/auth/me",
    }).then((response) => {
      setIsLogin(response.code === "000");
      setUserInfo(response.code === "000" ? response.data : {});
    });
  });

  return (
    <>
      {isLogin ? (
        <Routes>
          <Route path='/*' element={<Main />} />
        </Routes>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
