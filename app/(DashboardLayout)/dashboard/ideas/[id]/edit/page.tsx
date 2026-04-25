import EditIdea from "@/components/modules/Dashboard/member/EditIdea/EditIdea";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditIdeaPage({ params }: Props) {
  const { id } = await params;
  return <EditIdea id={id} />;
}
