import Routes from "./Routes";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./contexts/ToastContext";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          <Routes />
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
