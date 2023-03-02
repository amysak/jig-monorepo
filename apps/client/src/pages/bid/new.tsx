import { useAuthorization } from "lib/hooks";

export default function BidPage() {
  const { user } = useAuthorization();

  return null;
}
