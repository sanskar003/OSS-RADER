import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <LoginButton />
      <LogoutButton />
    </div>
  );
}
