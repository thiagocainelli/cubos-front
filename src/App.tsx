import Routes from "./Routes";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";

import { ThemeProvider } from "./contexts/ThemeContext";
import './index.css';

function App() {

  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
