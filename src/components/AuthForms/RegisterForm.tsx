import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { register as registerOperation } from "../../redux/auth/operations";
import styles from "./AuthForms.module.css";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    username: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function RegisterForm() {
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
    //  5. Самое важное: Отправляем данные в Redux -> Firebase
    dispatch(
      registerOperation({
        name: data.username, // В форме у нас username, а в Firebase ждем name
        email: data.email,
        password: data.password,
      }),
    )
      .unwrap() // Это позволяет узнать, успешно ли прошел запрос
      .then(() => {
        console.log("Регистрация успешна!");
        reset(); // Очищаем форму, если все ок
      })
      .catch((err) => {
        console.error("Ошибка регистрации:", err);
        // Можно показать уведомление пользователю
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          {...register("username")}
          placeholder="Name"
          className={styles.input}
        />
        {errors.username && (
          <p className={styles.error}>{errors.username.message}</p>
        )}
      </div>
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
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Sign Up
      </button>
    </form>
  );
}
