"use client";
// import { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormType, FormLoginSchema } from "./schema";

import api from "@/services/api";
import { showToast } from "@/utils/toastMessage";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormLoginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: FormType) => {
    try {
      await api.post("/user/login", {
        email: data.email,
        password: data.password,
      });

      showToast("Login!", {
        type: "success",
      });

      // Redirect to the home page or any other page
      router.push("/home");
    } catch (err: any) {
      const msn = err.response.data.message;

      showToast(msn, {
        type: "error",
      });
    }
  };

  return (
    <Form className="w-full max-w-md gap-5" onSubmit={handleSubmit(onSubmit)}>
      <Input
        errorMessage={errors.email?.message as string}
        isInvalid={!!errors.email}
        label="Email"
        labelPlacement="outside"
        placeholder="Email..."
        type="email"
        {...register("email")}
      />

      <Input
        errorMessage={errors.password?.message as string}
        isInvalid={!!errors.password}
        label="Senha"
        labelPlacement="outside"
        placeholder="Senha..."
        type="text"
        {...register("password")}
      />

      <Button type="submit" variant="bordered">
        Submit
      </Button>
    </Form>
  );
}
