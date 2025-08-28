import Routes from "./Routes";
import { AuthProvider } from "./contexts/AuthContext";

import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
