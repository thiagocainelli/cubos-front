import React from "react";
import { ConfigProvider, Layout, theme as antdTheme } from "antd";
import HeaderLayout from "./Header";
import FooterLayout from "./Footer";
import { useTheme } from "../contexts/ThemeContext";
import background from "../../public/images/background.png";

const LayoutBase = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "light"
            ? antdTheme.defaultAlgorithm
            : antdTheme.darkAlgorithm,
      }}
    >
      <Layout
        className={`flex flex-1 flex-col overflow-auto min-h-screen relative`}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            filter: "grayscale(100%)",
          }}
        />

        <HeaderLayout />

        <Layout.Content className={`flex-1 flex relative`}>
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `linear-gradient(
                  to bottom,
                  rgba(0, 0, 0, 0.5) 0%,
                  rgba(0, 0, 0, 0.7) 30%,
                  rgba(0, 0, 0, 0.9) 60%,
                  rgba(0, 0, 0, 1) 100%
                )`,
            }}
          />

          <div className="relative z-10 flex-1 flex mx-auto md:p-5 p-2">
            {children}
          </div>
        </Layout.Content>

        <FooterLayout />
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutBase;
