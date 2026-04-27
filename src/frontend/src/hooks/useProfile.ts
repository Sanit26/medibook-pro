import { useQuery } from "@tanstack/react-query";
import type { PatientProfile } from "../types";
import { useBackend } from "./useBackend";

export function useProfile() {
  const { actor, isAuthenticated, isLoading } = useBackend();

  const query = useQuery<PatientProfile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        // getMyProfile returns Motoko ?PatientProfile encoded as [] | [PatientProfile]
        const result = await (
          actor as unknown as Record<
            string,
            (...args: unknown[]) => Promise<unknown>
          >
        ).getMyProfile();
        return Array.isArray(result) && result.length > 0
          ? (result[0] as PatientProfile)
          : null;
      } catch {
        return null;
      }
    },
    enabled: isAuthenticated && !isLoading,
  });

  const isAdmin = query.data?.role === "Admin";
  const isPatient = query.data?.role === "Patient";

  return {
    profile: query.data ?? null,
    isAdmin,
    isPatient,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
