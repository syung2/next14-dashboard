"use client";

import { authenticate } from "@/app/libs/action";
import styles from "./loginForm.module.css";
import { useState } from "react";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {state && <p className={styles.error}>{state}</p>}
    </form>
  );
};

export default LoginForm;
