import { getUserInfo } from "@/services/auth/auth.services";
import { getMySingleIdea } from "@/services/memberDashboard/ideas.services";
import EditIdeaForm from "./EditIdeaForm/EditIdeaForm";


interface Props {
  id: string;
}

export default async function EditIdea({ id }: Props) {
  await getUserInfo(); // Ensures user is authenticated

  const res = await getMySingleIdea(id);
  const idea = res?.data;

  if (!idea) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-muted-foreground text-sm">Idea not found.</p>
      </div>
    );
  }

  return <EditIdeaForm idea={idea} />;
}
