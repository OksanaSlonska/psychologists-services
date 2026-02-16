import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useRef, useEffect } from "react";
import styles from "./AppointmentForm.module.css";
import type { Psychologist } from "../../types/psychologist";
import toast from "react-hot-toast";

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

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
    setValue,
    trigger,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(appointmentSchema),
    mode: "onTouched",
  });

  const [isTimeListOpen, setIsTimeListOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsTimeListOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTimeSelect = (time: string) => {
    setValue("time", time);
    trigger("time");
    setIsTimeListOpen(false);
  };

  const onSubmit = () => {
    toast.success(`Success! Appointment confirmed.`);
    reset();
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
            <div
              className={styles.timeInputWrapper}
              ref={dropdownRef}
              onClick={() => setIsTimeListOpen(!isTimeListOpen)}
            >
              <input
                {...register("time")}
                placeholder="00:00"
                className={errors.time ? styles.inputError : styles.input}
                autoComplete="off"
                readOnly
              />

              <svg className={styles.iconClock}>
                <use href="/image/icons.svg#icon-clock" />
              </svg>

              {isTimeListOpen && (
                <div className={styles.dropdown}>
                  <p className={styles.dropdownTitle}>Meeting time</p>
                  <ul className={styles.timeList}>
                    {timeSlots.map((slot) => (
                      <li
                        key={slot}
                        className={styles.timeItem}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTimeSelect(slot);
                        }}
                      >
                        {slot}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
