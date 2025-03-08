import FloatingShape from "@/components/FloatingShape";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";

const LoginPage = () => {
  return (
    <main className="b-fuchsia-500 relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating Shape */}
      <FloatingShape color="bg-green-500" size="size-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="size-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="size-32" top="40%" left="-10%" delay={2} />

      <div className="b-rose-500 w-full max-w-5xl flex items-center">
        {/* Form */}
        <LoginForm />

        {/* Image */}
        <div className="b-fuchsia-500">
          <div className="relative size-[30rem]">
            <Image src="/login.svg" alt="Signup" fill />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
