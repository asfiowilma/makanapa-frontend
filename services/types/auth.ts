export interface LoginRequestPayload {
  username: string;
  password: string;
}

export interface RegisterRequestPayload {
  namaLengkap: string;
  username: string;
  password: string;
  idLine: string;
}

export enum ROLE {
  PENGGUNA = "PENGGUNA",
}

export interface UserProfile {
  namaLengkap: string;
  username: string;
  userRole: ROLE;
  idLine: string;
}

export interface AuthContextValue {
  userProfile: UserProfile | null;
  setUserProfile: (payload: UserProfile) => void;
  useLogin: (loginInfo: LoginRequestPayload) => void;
  useRegister: (registerPayload: RegisterRequestPayload) => void;
  isLoadingLogin: boolean;
  isLoadingRegister: boolean;
  isAuthenticated: boolean;
  logout: () => void;
}
