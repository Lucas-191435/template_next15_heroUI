import * as yup from "yup";
import { InferType } from "yup";

export const FormLoginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
});

export type FormType = InferType<typeof FormLoginSchema>;
