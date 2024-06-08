"use client";

import { authenticateNormal } from "@/app/libs/action";
import styles from "./loginForm.module.css";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const handleLogin = async (formData: FormData) => {
    const data = await authenticateNormal(formData);
    data && data.error && setError(data.error);
  };

  return (
    <form action={handleLogin} className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default LoginForm;
