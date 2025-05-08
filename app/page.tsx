"use client";
// import { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InferType } from "yup";
import api from "@/services/api";
const formats = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
  "image/gif",
];
const maxSize = 1024 * 1024 * 5; // 5MB
const schema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
  validatePassword: yup
    .string()
    .oneOf([yup.ref("password")], "A senha não bate")
    .required("Campo obrigatório"),
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  avatarProfile: yup
    .mixed<FileList>()
    .required("Campo obrigatório")
    .test("fileFormat", "Formato inválido", (value) => {
      if (!value || value.length === 0) return false;

      return formats.includes(value[0].type);
    })
    .test("fileSize", "Tamanho máximo de 5MB", (value) => {
      if (!value || value.length === 0) return false;

      return value[0].size <= maxSize;
    }),
});

type FormType = InferType<typeof schema>;
export default function Home() {
  const {
    // control,
    // setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: FormType) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatarProfile", data.avatarProfile[0]);

      const res = await api.post("/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Form className="w-full max-w-sm gap-5" onSubmit={handleSubmit(onSubmit)}>
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
    </section>
  );
}
