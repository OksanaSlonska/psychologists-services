import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { login } from "../../redux/auth/operations";

import styles from "./AuthForms.module.css";

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(login(data))
      .unwrap()
      .then(() => {
        console.log("Вход выполнен успешно!");
        reset();
      })
      .catch((err) => {
        console.error("Ошибка входа:", err);
        alert("Неверный email или пароль"); // Временное уведомление
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          {...register("email")}
          placeholder="Email"
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.inputWrapper}>
        <div className={styles.inputPassword}>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className={styles.input}
          />
          <svg width="30" height="30" className={styles.iconEyeOff}>
            <use href="/image/icons.svg#icon-eye-off" />
          </svg>
        </div>
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className={styles.submitBtn}>
        Log In
      </button>
    </form>
  );
}
