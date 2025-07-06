import { ToastContainer } from "react-toastify";
import { RouteApp } from "./routes.tsx";

function App() {
  return (
    <>
      <div style={{ padding: "2rem" }}>
        <ToastContainer />
        <RouteApp />
      </div>
    </>
  );
}

export default App;
