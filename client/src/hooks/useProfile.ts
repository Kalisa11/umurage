import { getCurrentUser } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

const useProfile = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getCurrentUser(),
  });

  return { data, error, isLoading, refetch };
};

export default useProfile;
