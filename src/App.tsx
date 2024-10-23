import { AppProvider } from "./core/providers/app-provider";
import { WssProvider } from "./core/providers/wss-provider";
import Router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <AppProvider>
      <WssProvider>
        <QueryClientProvider client={client}>
          <Router />;
        </QueryClientProvider>
      </WssProvider>
    </AppProvider>
  );
}

export default App;
