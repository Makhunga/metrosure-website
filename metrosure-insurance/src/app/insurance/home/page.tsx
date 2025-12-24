import { redirect } from "next/navigation";

// Redirect /insurance/home to /insurance/auto since Metrosure combines Car & Home insurance
export default function HomeInsurancePage() {
  redirect("/insurance/auto");
}
