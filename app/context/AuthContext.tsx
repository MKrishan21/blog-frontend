"use client";

import { getUserById } from "@/api-handeling/apis/getApi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";

interface userType {
  name: string;
  email: string;
  password: string;
  _id: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  Handlelogout: () => void;
  userData: userType;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");

  const { data: userData = [] } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId") || "";
    const token = localStorage.getItem("accessToken");
    setUserId(storedUserId);
    if (token) setIsAuthenticated(true);
  }, [isAuthenticated]);

  const Handlelogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
    toast.success("Logout Successful");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, Handlelogout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
