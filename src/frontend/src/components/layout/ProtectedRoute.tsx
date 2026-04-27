import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { GlassCard } from "../ui/GlassCard";
import { LoadingSkeleton } from "../ui/LoadingSkeleton";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoggingIn, isAdmin, isProfileLoading } = useAuth();

  const isLoading = isLoggingIn || isProfileLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <GlassCard variant="elevated" padding="lg" className="w-full max-w-sm">
          <LoadingSkeleton lines={4} />
        </GlassCard>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
