"use client";

import { useEffect } from "react";
import { Button } from "@/components/button";
import styles from "./errors.module.css";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Something went wrong!</h1>
        <p className={styles.message}>{error.message}</p>
        <Button onClick={reset} className={styles.button}>
          Try again
        </Button>
      </div>
    </div>
  );
}
