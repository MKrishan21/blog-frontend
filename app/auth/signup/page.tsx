"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Loader2, Lock, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRegisterMutation } from "@/api-handeling/apis/postPutApis";
import { Label } from "@radix-ui/react-label";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function SignUpPage() {
  const router = useRouter();
  const [showPw, setShowPw] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues: getFieldValues,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const {
    mutate: onSubmit,
    data,
    isPending,
    isSuccess,
  } = useRegisterMutation();

  return (
    <div className="container flex items-center justify-center min-h-[80vh] py-12">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your information below to create your account
          </p>
        </div>

        <div className="grid gap-6">
          <form
            onSubmit={handleSubmit((values) => onSubmit(values))}
            className="space-y-4"
          >
            {/*  Name */}
            <div className="space-y-2">
              <Label className="text-gray-500" htmlFor="email">
                Name
              </Label>
              <div className="relative w-full">
                <span>
                  <MailIcon className="absolute left-3 top-1/4 transform -translate-y-2/5 w-5 h-5 text-gray-400" />
                </span>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  {...register("name")}
                  className={`rounded-full h-[44px] pl-10 border-2`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/*  Email */}

            <div className="space-y-2">
              <Label className="text-gray-500" htmlFor="email">
                Email
              </Label>
              <div className="relative w-full">
                <span>
                  <MailIcon className="absolute left-3 top-1/4 transform -translate-y-2/5 w-5 h-5 text-gray-400" />
                </span>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  {...register("email")}
                  className={`rounded-full h-[44px] pl-10 border-2`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}

            <div className="space-y-2">
              <Label className="text-gray-500" htmlFor="password">
                Password
              </Label>
              <div className="relative w-full">
                <span>
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </span>
                <span onClick={() => setShowPw(!showPw)}>
                  {showPw ? (
                    <Eye className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeOff className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  )}
                </span>

                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`rounded-full h-[44px] pl-10 border-2`}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-sky-500 hover:text-sky-600 hover:underline underline-offset-4"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
