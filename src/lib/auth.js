"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "sesion_rauli";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

function getAppPassword() {
  const p = process.env.APP_PASSWORD;
  if (!p) {
    // En desarrollo sin .env.local, usamos un default para no bloquear.
    // En producción (Vercel), APP_PASSWORD es obligatorio.
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "APP_PASSWORD no está configurado. Definilo en las variables de entorno de Vercel."
      );
    }
    return "FundoRauli2026";
  }
  return p;
}

export async function login(prevState, formData) {
  const password = formData.get("password");

  if (password !== getAppPassword()) {
    return { error: "Clave incorrecta. Probá de nuevo." };
  }

  cookies().set({
    name: COOKIE_NAME,
    value: password,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  redirect("/dashboard");
}

export async function logout() {
  cookies().delete(COOKIE_NAME);
  redirect("/login");
}
