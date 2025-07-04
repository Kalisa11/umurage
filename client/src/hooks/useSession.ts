import { getSession } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

const useSession = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  return { data, error, isLoading };
};

export default useSession;
