import Router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { WebSocketProvider } from "./core/hook/use-wss";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <WebSocketProvider>
      <QueryClientProvider client={client}>
        <Router />;
      </QueryClientProvider>
    </WebSocketProvider>
  );
}

export default App;
