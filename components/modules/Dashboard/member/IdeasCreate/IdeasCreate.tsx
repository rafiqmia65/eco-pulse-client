import IdeasCreateHeader from "./IdeasCreateHeader/IdeasCreateHeader";
import IdeasCreateForm from "./IdeasCreateForm/IdeasCreateForm";

const IdeasCreate = () => {
  return (
    <div className="pt-6 grid gap-8">
      <IdeasCreateHeader />
      <IdeasCreateForm />
    </div>
  );
};

export default IdeasCreate;
