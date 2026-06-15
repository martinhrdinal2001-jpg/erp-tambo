import { redirect } from "next/navigation";

export default function Home() {
  // De momento, la raíz lleva directo al login.
  redirect("/login");
}
