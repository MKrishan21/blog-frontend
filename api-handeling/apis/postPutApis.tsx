import { useMutation } from "@tanstack/react-query";
import { post, postAsForm, putAsForm } from "../HttpServiceInstance";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type payloadObject = { [key: string]: any };

export const addBlog = async (data: FormData) => {
  try {
    const response = await postAsForm("/api/blogs", data);
    return response;
  } catch (error) {
    console.error("Error in signupHelper:", error);
    throw error;
  }
};
export const editBlog = async (id: string, data: FormData) => {
  try {
    const response = await putAsForm(`/api/blogs/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error in signupHelper:", error);
    throw error;
  }
};

const userLogin = async (data: payloadObject) => {
  try {
    const res = await post("/api/auth/login", data);
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};

export const useLoginMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: userLogin,
    onSuccess: (message, data) => {
      console.log(message, "message");
      if (message?.status === 400) {
        return toast.error("Invalid Credentials!");
      }
      if (message?.token && message.userId) {
        const token = message?.token;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userId", message.userId);
        toast.success("Login Successful");
        router.push("/dashboard");
      }
    },
    onError: (error: any) => {
      console.log(error, "error");
      toast.error(error?.data?.message || "Something went wrong!");
    },
  });
};
const userRegister = async (data: payloadObject) => {
  try {
    const res = await post("/api/auth/register", data);
    return res;
  } catch (error) {
    console.log(error, "error");
  }
};

export const useRegisterMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: userRegister,
    onSuccess: (message) => {
      // console.log(message, "message");
      if (message?.message === "User registered successfully") {
        toast.success("Registration Successful");
        router.push("/auth/login");
      }
      toast.error(message?.data?.message || "Something went wrong!");
    },
    onError: (error: any) => {
      console.log(error, "error");
      toast.error(error?.data?.message || "Something went wrong!");
    },
  });
};
