import Router from "./router";
import "react-toastify/dist/ReactToastify.css";
import { WebSocketProvider } from "./core/hook/use-wss";

function App() {
  return (
    <WebSocketProvider>
      <Router />;
    </WebSocketProvider>
  );
}

export default App;
