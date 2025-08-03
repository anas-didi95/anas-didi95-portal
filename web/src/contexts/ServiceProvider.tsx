import { AuthService } from "@/services/AuthService";
import { createAxiosInstance } from "@/services/AxiosFactory";
import { UserService } from "@/services/UserService";
import React from "react";
import { ServiceContext } from "./ServiceContext";

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authService = new AuthService(createAxiosInstance("/portal"));
  const userService = new UserService(createAxiosInstance("/portal/graphql"));

  return (
    <ServiceContext.Provider value={{ authService, userService }}>
      {children}
    </ServiceContext.Provider>
  );
};
