import { useSetRecoilState } from "recoil";
import { axiosPost } from "../../libs/axios";
import { isLoginState } from "../../libs/atoms";

function Login() {
  const setIsLogin = useSetRecoilState(isLoginState);

  const fnSignin = () => {
    axiosPost({
      url: "/auth/signin",
      data: {
        email: "kjg@iwi.co.kr",
        password: "01091663305",
      },
    }).then((response) => {
      setIsLogin(response.code === "000");
    });
  };

  return (
    <div>
      <div onClick={fnSignin}>Signin</div>
    </div>
  );
}

export default Login;
