import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginState } from "./libs/atoms";
import Signin from "./pages/signin/Signin";
import Main from "./pages/main/Main";

function App() {
  const isLogin = useRecoilValue(isLoginState);

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
