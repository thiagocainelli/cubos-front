import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Configuração para compatibilidade com React 19
import { ConfigProvider } from "antd";

// Configuração global do Ant Design para React 19
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <ConfigProvider
    theme={{
      token: {
        motion: false,
        borderRadius: 4,
        controlHeight: 40,
      },
      components: {
        DatePicker: {
          borderRadius: 4,
          controlHeight: 40,
        },
        Form: {
          itemMarginBottom: 16,
        },
        Input: {
          borderRadius: 4,
          controlHeight: 40,
        },
        Select: {
          borderRadius: 4,
          controlHeight: 40,
        },
      },
    }}
    componentSize="middle"
    autoInsertSpaceInButton={false}
    getPopupContainer={(triggerNode) =>
      triggerNode?.parentElement || document.body
    }
  >
    <App />
  </ConfigProvider>
);
