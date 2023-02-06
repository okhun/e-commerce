import { useField, useForm } from "vee-validate";
import { type InferType, object, string } from "yup";
import { useAuthStore } from "@/store/auth";

export const useRegister = () => {
  const store = useAuthStore();
  const { register } = store;
  const errorMessage = "Field is requied";

  const formSchema = object({
    name: string().required(errorMessage),
    username: string().required(errorMessage),
    password: string().min(6, errorMessage).required(errorMessage),
  });
  type FormType = InferType<typeof formSchema>;

  const { handleSubmit } = useForm<FormType>({
    validationSchema: formSchema,
    initialValues: { name: "", username: "", password: "" },
  });

  const name = useField<FormType["name"]>("name");
  const username = useField<FormType["username"]>("username");
  const password = useField<FormType["password"]>("password");

  const handleFormSubmit = handleSubmit((values) => {
    register(values);
  });

  return { username, password, name, handleFormSubmit };
};
