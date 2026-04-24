import IdeasCreateHeader from "./IdeasCreateHeader/IdeasCreateHeader";
import IdeasCreateForm from "./IdeasCreateForm/IdeasCreateForm";

const IdeasCreate = () => {
  return (
    <div className="py-6 overflow-x-hidden">
      <div className="grid gap-8 max-w-5xl w-full mx-auto px-4">
        <IdeasCreateHeader />
        <IdeasCreateForm />
      </div>
    </div>
  );
};

export default IdeasCreate;