import { jwtDecode } from "jwt-decode";
import { useAppStore } from "./store";

// export const URL = "http://localhost:3002/api";
export const URL = "https://store.puretik.com/api";
// export const URL = "http://85.208.51.126:3002/api";
export const IMAGE_URL =
  "https://drlab.us-east-1.linodeobjects.com/karada-store";

export const isTokenValid = (token) => {
  try {
    let { exp } = jwtDecode(token);
    return Date.now() <= exp * 1000;
  } catch (err) {
    return false;
  }
};

//https://example.com/api/check-product-available?productId=2

response: {
  success: true; // if savilable
}
response: {
  success: false; // if not savilable
}

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
      localStorage.removeItem("karada-token");
      useAppStore.setState({
        isLogin: false,
      });
      throw Error("refresh token expired");
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
