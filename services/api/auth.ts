import { AUTH_URL } from "@constants/endpoints";
import { LoginRequestPayload, RegisterRequestPayload, UserProfile } from "@typeDefs/auth";
import axios from "axios";

export const login = async (loginInfo: LoginRequestPayload) => {
  const res = await axios.post(`${AUTH_URL}/auth`, loginInfo);
  if (res.status === 200) return res.data;
  throw new Error("Username atau Password salah");
};

export const register = async (registerInfo: RegisterRequestPayload) => {
  const res = await axios.post(`${AUTH_URL}/auth/register/pengguna`, registerInfo);
  if (res.status === 200) return res.data;
  throw new Error("Registrasi gagal, coba lagi");
};

export const loadUserProfile = async (token: string) => {
  if (!token) throw new Error("Token tidak ditemukan");

  const res = await axios.get(`${AUTH_URL}/pengguna/detail`);
  if (res.data) return res.data;
  throw new Error("token tidak valid");
};
