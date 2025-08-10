import type { IEventSourceMessage } from "@/commons/types";
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
  const reconnectDelay = useRef(3000);

  useEffect(() => {
    let closedByUser = false;

    const connect = () => {
      const eventSource = new EventSource("/portal/api/v1/sse/connect");
      eventSourceRef.current = eventSource;

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data as string) as IEventSourceMessage;
        toast.success(data.message);
        reconnectDelay.current = 3000; // reset delay
      };

      eventSource.onerror = (err) => {
        console.warn("SSE error:", err);
        eventSource.close();
        if (!closedByUser) {
          setTimeout(connect, reconnectDelay.current);
          reconnectDelay.current = Math.min(reconnectDelay.current * 2, 30000); // exponential backoff
        }
      };
    };

    connect();

    return () => {
      closedByUser = true;
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

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
