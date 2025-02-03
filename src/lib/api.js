import { jwtDecode } from "jwt-decode";
import { useAppStore } from "./store";

// export const URL = "http://localhost:3003/api";
export const URL = process.env.NEXT_PUBLIC_API_URL;
// export const URL = "https://store.puretik.com/api";
// export const URL = "http://85.208.51.126:3002/api";
export const IMAGE_URL =
  "https://karadastore.eu-central-1.linodeobjects.com/karada-store";

export const isTokenValid = (token) => {
  try {
    let { exp } = jwtDecode(token);
    return Date.now() <= exp * 1000;
  } catch (err) {
    return false;
  }
};

export const reNewToken = async () => {
  try {
    let refreshToken = localStorage.getItem("karada-refreshToken");
    const resp = await apiCall({
      pathname: "/client/auth/refresh",
      method: "POST",
      data: {
        refreshToken,
      },
    });
    if (!resp?.accessToken) return;
    return resp?.accessToken && resp?.user;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const apiCall = async ({
  pathname,
  method = "GET",
  data = null,
  isFormData = false,
  auth = false,
}) => {
  try {
    let token = localStorage.getItem("karada-token");
    let user = localStorage.getItem("karada-user");
    if (token) {
      token = await reNewToken().accessToken;
      user = await reNewToken().user;
      console.log("renewed token", token);
      console.log("renewed user", user);
      if (!token) {
        localStorage.removeItem("karada-token");
        localStorage.removeItem("karada-refreshToken");
        localStorage.removeItem("karada-user");
        useAppStore.setState({
          isLogin: false,
        });
        useAppStore.getState().updateUserInfo(user);
        return;
      }
      localStorage.setItem("karada-token", token);
      localStorage.setItem("karada-user", user);
    }

    let body = undefined;
    const myHeaders = new Headers();

    if (auth) myHeaders.append("Authorization", token);
    // if (auth) myHeaders.append("Authorization", `Bearer ${token}`);
    if (!!data && isFormData) {
      var formdata = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formdata.append(key, value);
      });
      body = formdata;
    } else if (!!data) {
      myHeaders.append("Content-Type", "application/json");
      body = JSON.stringify(data);
    }

    let res = await fetch(`${URL}${pathname}`, {
      method,
      headers: myHeaders,
      body,
    });

    let jsonRes = await res.json();
    return jsonRes;
  } catch (error) {
    return error;
  }
};
