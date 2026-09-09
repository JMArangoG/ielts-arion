import type { Metadata } from "next";
import OnboardingClient from "./OnboardingClient";

export const metadata: Metadata = {
  title: "Onboarding | IELTS ORION",
  description: "Clasificación y configuración de tu perfil IELTS.",
};

export default function OnboardingPage() {
  return <OnboardingClient />;
}