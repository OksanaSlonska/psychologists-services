import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./AppointmentForm.module.css";
import type { Psychologist } from "../../types/psychologist";
import toast from "react-hot-toast";

const appointmentSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
      .string()
      .matches(/^\+?\d{10,15}$/, "Invalid phone")
      .required("Phone is required"),
    time: yup
      .string()
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format HH:MM")
      .required("Time is required"),

    comment: yup.string().defined().default(""),
  })
  .required();

type FormData = yup.InferType<typeof appointmentSchema>;

interface Props {
  psychologist: Psychologist;
  onSubmitSuccess: () => void;
}

export const AppointmentForm = ({ psychologist, onSubmitSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(appointmentSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    toast.success(`Success! Appointment confirmed.`);
    onSubmitSuccess();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Make an appointment with a psychologist</h2>
      <p className={styles.subtitle}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>

      <div className={styles.psychologistBrief}>
        <img
          src={psychologist.avatar_url}
          alt={psychologist.name}
          className={styles.avatar}
        />
        <div className={styles.psychologistText}>
          <p className={styles.label}>Your psychologist</p>
          <p className={styles.name}>{psychologist.name}</p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fieldWrapper}>
          <input
            {...register("name")}
            placeholder="Name"
            className={errors.name ? styles.inputError : styles.input}
          />
          {errors.name && (
            <p className={styles.errorText}>{errors.name.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.fieldWrapper}>
            <input
              {...register("phone")}
              placeholder="+380"
              className={errors.phone ? styles.inputError : styles.input}
            />
            {errors.phone && (
              <p className={styles.errorText}>{errors.phone.message}</p>
            )}
          </div>

          <div className={styles.fieldWrapper}>
            <div className={styles.timeInputWrapper}>
              <input
                {...register("time")}
                placeholder="00:00"
                className={errors.time ? styles.inputError : styles.input}
              />
              <svg className={styles.iconClock} width="20" height="20">
                <use href="/image/icons.svg#icon-clock" />
              </svg>
            </div>
            {errors.time && (
              <p className={styles.errorText}>{errors.time.message}</p>
            )}
          </div>
        </div>

        <div className={styles.fieldWrapper}>
          <input
            {...register("email")}
            placeholder="Email"
            className={errors.email ? styles.inputError : styles.input}
          />
          {errors.email && (
            <p className={styles.errorText}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.fieldWrapper}>
          <textarea
            {...register("comment")}
            placeholder="Comment"
            className={styles.textarea}
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Send
        </button>
      </form>
    </div>
  );
};
