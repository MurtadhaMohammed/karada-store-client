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
    return resp?.accessToken;
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
    if (auth && !isTokenValid(token)) {
      token = await reNewToken();
      if (!token) {
        localStorage.removeItem("karada-token");
        localStorage.removeItem("karada-refreshToken");
        useAppStore.setState({
          isLogin: false,
        });
        useAppStore.getState().updateUserInfo(token);
        return;
      }
      localStorage.setItem("karada-token", token);
    }
    let { id, name, phone, address } = jwtDecode(token);
    localStorage.setItem("karada-account-id", id);
    localStorage.setItem("karada-account-name", name);
    localStorage.setItem("karada-account-phone", phone);
    localStorage.setItem("karada-account-address", address);

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
