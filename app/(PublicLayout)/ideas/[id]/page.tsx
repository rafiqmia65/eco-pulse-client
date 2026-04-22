import IdeaDetails from "@/components/modules/public/IdeaDetails/IdeaDetails";
import { fetchIdeaById } from "./_actions";

export default async function IdeaDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetchIdeaById(id);

  return <IdeaDetails idea={res?.data} />;
}
