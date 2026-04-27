import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { Backend } from "../backend";

export function useBackend() {
  const { identity, isAuthenticated, isLoggingIn } = useInternetIdentity();
  const { actor, isFetching } = useActor<Backend>(createActor);

  return {
    actor,
    identity,
    isAuthenticated,
    isLoading: isFetching || isLoggingIn,
  };
}
