import { redirect } from "next/navigation";

export default function Chatbot() {
  return (
    <div>
      { redirect("/login") }
    </div>
  );
}
