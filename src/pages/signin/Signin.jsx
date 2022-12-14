import { useSetRecoilState } from "recoil";
import { axiosPost } from "../../libs/axios";
import { isLoginState } from "../../libs/atoms";
import { useLocation, useNavigate } from "react-router-dom";
import { BtnBlue, Input, Label, Toggle } from "../../components/form";
import { useForm } from "react-hook-form";

function Login() {
  const setIsLogin = useSetRecoilState(isLoginState);

  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit } = useForm();

  const rememberMe = window.localStorage.getItem("rememberMe");

  const fnSignin = (data) => {
    axiosPost({
      url: "/auth/signin",
      data,
    }).then((response) => {
      setIsLogin(response.code === "000");
      if (response.code === "000") {
        Object.keys(response.data).map((key) => {
          window.localStorage.setItem(key, response.data[key]);
        });
        if (data.rememberMe) {
          window.localStorage.setItem("rememberMe", data.email);
        } else {
          window.localStorage.removeItem("rememberMe");
        }
        navigate(location.state?.referrer ?? "/");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(fnSignin)}>
      <div style={{ margin: "10px 0" }}>
        <Input
          {...register("email")}
          type='email'
          style={{ width: "100%" }}
          placeholder='email'
          maxlength='50'
          defaultValue={rememberMe && rememberMe}
          autoFocus={!rememberMe}
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <Input
          {...register("password")}
          type='password'
          style={{ width: "100%" }}
          placeholder='password'
          maxlength='50'
          autoFocus={rememberMe}
        />
      </div>
      <div style={{ margin: "10px 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Label>
          <Toggle {...register("rememberMe")} type='checkbox' defaultChecked={rememberMe} />
          <span>Remember Me</span>
        </Label>
      </div>
      <div style={{ margin: "10px 0" }}>
        <BtnBlue style={{ width: "100%" }}>Sign in</BtnBlue>
      </div>
    </form>
  );
}

export default Login;
