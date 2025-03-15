import { RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appRouter from "./routes/AppRoutes";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        limit={3}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnFocusLoss={false}
        theme="colored"
      />

      <RouterProvider router={appRouter} />
      <ToastContainer />
    </div>
  );
}

export default App;
