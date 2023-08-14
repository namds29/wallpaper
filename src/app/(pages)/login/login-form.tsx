"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { IconLock } from "../../assets/svgs/icon-lock";
import userService from "@/app/services/userService";
import { sha256 } from "js-sha256";

type User = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const [errMsg, setErrMsg] = useState<boolean>();
  const router = useRouter();

  const onSubmit: SubmitHandler<User> = async ({
    username,
    password,
  }: User) => {
    try {
      const res = await userService.login(username, sha256(password));
      console.log(res);
      if (res.message === "success") {
        localStorage.setItem("token", res.data.access_token);
        setTimeout(() => {
          window.open("/dashboard", "_self");
        }, 1000);
      }
    } catch (error) {
      setErrMsg(true);
    }
  };
  useEffect(() => {
    if (userService.isLoggedIn()) router.push("/dashboard");
    return () => {
      setErrMsg(false);
    };
  }, []);
  return (
    <div className="w-30rem">
      <div className="flex justify-center font-bold mb-4">
        <IconLock />
      </div>
      <form
        className="bg-white shadow-2xl rounded px-6 pt-2 pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errMsg && <p className="text-red-500 text-center">Your username or password is incorrect</p>}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.username ? "border-red-500" : ""
            }`}
            id="username"
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <p className="text-red-500 text-xs italic">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? "border-red-500" : ""
            }`}
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
