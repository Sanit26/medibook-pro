import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/layout/Layout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { GlassCard } from "./components/ui/GlassCard";
import { LoadingSkeleton } from "./components/ui/LoadingSkeleton";
import { PageTransition } from "./components/ui/PageTransition";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastProvider } from "./contexts/ToastContext";

// Lazy-loaded pages
const LandingPage = lazy(() => import("./pages/Landing"));
const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const DoctorsPage = lazy(() => import("./pages/Doctors"));
const BookPage = lazy(() => import("./pages/Book"));
const AppointmentsPage = lazy(() => import("./pages/Appointments"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const AdminPage = lazy(() => import("./pages/Admin"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <GlassCard padding="lg" className="w-full max-w-sm">
        <LoadingSkeleton lines={5} />
      </GlassCard>
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <ToastProvider>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </Layout>
      </ToastProvider>
    </AuthProvider>
  ),
});

// Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <PageTransition>
      <LandingPage />
    </PageTransition>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <PageTransition>
      <LoginPage />
    </PageTransition>
  ),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => (
    <PageTransition>
      <RegisterPage />
    </PageTransition>
  ),
});

const doctorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/doctors",
  component: () => (
    <PageTransition>
      <ProtectedRoute>
        <DoctorsPage />
      </ProtectedRoute>
    </PageTransition>
  ),
});

const bookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book/$doctorId",
  component: () => (
    <PageTransition>
      <ProtectedRoute>
        <BookPage />
      </ProtectedRoute>
    </PageTransition>
  ),
});

const appointmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/appointments",
  component: () => (
    <PageTransition>
      <ProtectedRoute>
        <AppointmentsPage />
      </ProtectedRoute>
    </PageTransition>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <PageTransition>
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    </PageTransition>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <PageTransition>
      <ProtectedRoute requireAdmin>
        <AdminPage />
      </ProtectedRoute>
    </PageTransition>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  doctorsRoute,
  bookRoute,
  appointmentsRoute,
  dashboardRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
