import { WssProvider } from "./core/providers/wss-provider";
import Router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <WssProvider>
      <QueryClientProvider client={client}>
        <Router />;
      </QueryClientProvider>
    </WssProvider>
  );
}

export default App;
