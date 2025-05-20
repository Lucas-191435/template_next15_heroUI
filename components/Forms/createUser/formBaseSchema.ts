import * as yup from "yup";
import { InferType } from "yup";

const formats = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
  "image/gif",
];
const maxSize = 1024 * 1024 * 5; // 5MB

export const FormCreateUser = yup.object().shape({
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

export type FormType = InferType<typeof FormCreateUser>;
