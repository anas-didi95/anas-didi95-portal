import React from "react";
import { AuthService } from "../services/AuthService";
import { createAxiosInstance } from "../services/AxiosFactory";
import { ServiceContext } from "./ServiceContext";

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authService = new AuthService(createAxiosInstance("/portal"));

  return (
    <ServiceContext.Provider value={{ authService }}>
      {children}
    </ServiceContext.Provider>
  );
};
