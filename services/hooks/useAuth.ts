import { AuthContext } from "@context/AuthContext";
import { AuthContextValue } from "@typeDefs/auth";
import React from "react";

const useAuth = (): AuthContextValue => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default useAuth;
