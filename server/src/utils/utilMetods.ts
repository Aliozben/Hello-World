import _cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();
const cryptr = new _cryptr(process.env.CRYPT_KEY!);

export const cryptText = (text: string) => {
  return cryptr.encrypt(text);
};

export const decryptText = (text: string) => {
  return cryptr.decrypt(text);
};
