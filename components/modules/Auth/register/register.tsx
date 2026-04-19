import Section from "@/components/shared/reusableComponents/Section";
import RegisterHeader from "./RegisterHeader/RegisterHeader";
import RegisterForm from "./RegisterForm/RegisterForm";

const Register = () => {
  return (
    <Section className="min-h-screen flex items-center justify-center bg-linear-to-b from-background to-muted/30 px-4">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl w-full">
        <RegisterHeader />
        <RegisterForm />
      </div>
    </Section>
  );
};

export default Register;
