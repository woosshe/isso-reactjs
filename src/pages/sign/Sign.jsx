import { useSetRecoilState } from "recoil";
import { axiosPost } from "../../libs/axios";
import { isLoginState } from "../../libs/atoms";
import { useLocation, useNavigate } from "react-router-dom";
import { BtnBlue, Input, Label, Toggle } from "../../components/Form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  & form {
    width: 400px;
    & h1 {
      font-size: 1.5em;
      text-align: center;
    }
  }
`;

export const Signin = () => {
  const setIsLogin = useSetRecoilState(isLoginState);

  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit } = useForm();

  const rememberMe = window.localStorage.getItem("rememberMe");

  const fnSignin = (data) => {
    axiosPost({
      url: "/api/auth/signin",
      data,
    }).then((response) => {
      setIsLogin(response.code === "000");
      if (response.code === "000") {
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
    <Wrap>
      <form onSubmit={handleSubmit(fnSignin)}>
        <h1>IWI SSO</h1>
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
    </Wrap>
  );
};

export const Signout = () => {
  const setIsLogin = useSetRecoilState(isLoginState);

  const navigate = useNavigate();

  useEffect(() => {
    axiosPost({
      url: "/api/auth/signout",
    }).then((response) => {
      setIsLogin(false);
      navigate("/signin");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
