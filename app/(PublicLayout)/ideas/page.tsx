import Ideas from "@/components/modules/public/Ideas/Ideas";
import { getUserInfo } from "@/services/auth/auth.services";

export default async function IdeasPage() {
  const user = await getUserInfo();
  return <Ideas currentUserId={user?.id} />;
}
