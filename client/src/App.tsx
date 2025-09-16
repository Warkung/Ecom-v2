import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/darkmode/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastContainer />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
