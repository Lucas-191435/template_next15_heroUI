"use client";
// import { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormType, FormCreateUser } from "./formBaseSchema";

import api from "@/services/api";
import { showToast } from "@/utils/toastMessage";

export default function FormCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormCreateUser),
    mode: "onSubmit",
  });

  const onSubmit = async (data: FormType) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatarProfile", data.avatarProfile[0]);

      await api.post("/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      showToast("Cadastrado!", {
        type: "success",
      });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log(err);
      const msn = err.response.data.message;

      showToast(msn, {
        type: "error",
      });
    }
  };

  return (
    <Form className="w-full max-w-md gap-5" onSubmit={handleSubmit(onSubmit)}>
      <Input
        errorMessage={errors.name?.message as string}
        isInvalid={!!errors.name}
        label="Nome"
        labelPlacement="outside"
        placeholder="Nome..."
        type="text"
        {...register("name")}
      />

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

      <Input
        errorMessage={errors.validatePassword?.message as string}
        isInvalid={!!errors.validatePassword}
        label="Validar Senha"
        labelPlacement="outside"
        placeholder="Validar senha..."
        type="text"
        {...register("validatePassword")}
      />

      <Input
        errorMessage={errors.avatarProfile?.message as string}
        isInvalid={!!errors.avatarProfile}
        label="Foto de perfil"
        labelPlacement="outside"
        placeholder="Foto..."
        type="file"
        {...register("avatarProfile")}
      />

      <Button type="submit" variant="bordered">
        Submit
      </Button>
    </Form>
  );
}
