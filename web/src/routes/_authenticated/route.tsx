import Navbar from "@/components/Navbar";
import useAuthTokenInfo, { queryKey } from "@/hooks/auth/useAuthTokenInfo";
import useAppStore from "@/stores/AppStore";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
  beforeLoad: ({ context: { queryClient } }) => {
    void queryClient.invalidateQueries({ queryKey });
  },
});

function AuthenticatedLayout() {
  const {
    data: tokenInfo,
    isSuccess,
    isFetching,
    isError,
  } = useAuthTokenInfo();
  const setUser = useAppStore((store) => store.action.setUser);
  const reset = useAppStore((store) => store.action.reset);
  const navigate = useNavigate();
  const eventSourceRef = useRef<EventSource>(null);

  useEffect(() => {
    const eventSource = new EventSource('/portal/api/v1/sse/connect');
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
      const data = JSON.parse(event.data);
      toast.success(event.data as string);
      console.log("data", data)
    };

    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      eventSource.close();
    };

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [])

  if (!isFetching && isError) {
    reset();
    void navigate({ to: "/sign-in", replace: true });
  }

  if (isSuccess) {
    setUser(tokenInfo);
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  } else {
    return <Skeleton />;
  }
}

function Skeleton() {
  return <div className="skeleton-block skeleton-center"></div>;
}
