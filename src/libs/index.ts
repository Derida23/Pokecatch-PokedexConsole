import CryptoJS from "crypto-js";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const SALT: string | undefined = process.env.REACT_APP_SECRET_KEY;

export const encrypt = async (hashed: string) => {
  let dataHashed = JSON.stringify(hashed);

  let hash = CryptoJS.AES.encrypt(dataHashed, SALT ?? "").toString();

  return hash;
};

export const decrypt = async (hashed: string) => {
  try {
    let bytes = CryptoJS.AES.decrypt(hashed, SALT ?? "");
    let result = await JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return result;
  } catch (e) {
    return null;
  }
};

export const setCookies = async (name: string, data: string) => {
  let expired = new Date();
  expired.setTime(expired.getTime() + 1 * 24 * 60 * 60 * 1000);
  // 24 Hour

  const cookiesEncrypt = await encrypt(data);
  cookies.set(name, cookiesEncrypt.toString(), {
    path: "/",
    expires: expired,
  });
};

export const getCookies = async (name: string) => {
  const dataCookies = await cookies.get(name.toString());

  if (dataCookies) {
    const data = await decrypt(dataCookies);
    return data;
  } else {
    return null;
  }
};

export const deleteCookies = (name: string) => {
  const data = cookies.remove(name, { path: "/" });

  return data;
};
