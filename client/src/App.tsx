import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/darkmode/theme-provider";
import MainNav from "./components/public/MainNav";
import { navLinks } from "./utils/link";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastContainer />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
