import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom/dist";
import { useSetRecoilState } from "recoil";
import { isLoginState, userInfoState } from "./libs/atoms";
import { axiosPost } from "./libs/axios";

const Token = () => {
  const setIsLogin = useSetRecoilState(isLoginState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/signin") {
      let token = window.localStorage.getItem("acsToken");
      if (token) {
        axios
          .post("/auth/token", { grant_type: "authorization_code" }, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            if (response.data.code === "000") {
              loginSuccess(response.data.data.acsToken);
            } else if (response.data.code === "800") {
              token = window.localStorage.getItem("refToken");
              if (token) {
                axios
                  .post(
                    "/auth/token",
                    { grant_type: "refresh_token" },
                    { headers: { Authorization: `Bearer ${token}` } }
                  )
                  .then((response) => {
                    if (response.data.code === "000") {
                      loginSuccess(response.data.data.acsToken);
                    } else {
                      loginFail();
                    }
                  });
              }
            } else {
              loginFail();
            }
          })
          .catch((error) => {
            loginFail();
          });
      } else {
        loginFail();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const loginSuccess = (token) => {
    window.localStorage.setItem("acsToken", token);
    setIsLogin(true);
    axiosPost({ url: "/auth/me" }).then((response) => {
      if (response.code === "000") {
        setUserInfo(response.data);
      } else {
        loginFail();
      }
    });
  };

  const loginFail = () => {
    window.localStorage.removeItem("acsToken");
    window.localStorage.removeItem("refToken");
    setIsLogin(false);
    setUserInfo({});
    navigate("/signin");
  };

  return null;
};

export default Token;
