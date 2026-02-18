import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { register as registerOperation } from "../../redux/auth/operations";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./AuthForms.module.css";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

interface Props {
  onClose: () => void;
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

export default function RegisterForm({ onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(
      registerOperation({
        name: data.username,
        email: data.email,
        password: data.password,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success("Successfully registered!");
        reset();
        onClose();
      })
      .catch((err) => {
        const errorMessage =
          typeof err === "string"
            ? err
            : "Registration failed. Please try again.";
        toast.error(errorMessage);
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
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className={styles.input}
          />

          <button
            type="button"
            className={styles.togglePasswordBtn}
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg className={styles.iconEyeOff}>
              <use
                href={`/image/icons.svg#${showPassword ? "icon-eye" : "icon-eye-off"}`}
              />
            </svg>
          </button>
        </div>

        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className={styles.submitBtn}>
        Sign Up
      </button>
    </form>
  );
}
