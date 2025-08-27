import React, { useContext } from "react";
import { ConfigProvider, Layout, theme as antdTheme } from "antd";
import HeaderLayout from "./Header";
import FooterLayout from "./Footer";
import { ThemeContext } from "../contexts/ThemeContext";

const LayoutBase = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "light"
            ? antdTheme.defaultAlgorithm
            : antdTheme.darkAlgorithm,
      }}
    >
      <main
        className={`w-full flex min-h-screen overflow-x-hidden ${
          theme === "light" ? "bg-white text-black" : "bg-[#001529] text-white"
        }`}
      >
        <Layout
          className={`md:px-4 px-2 flex flex-1 flex-col overflow-auto" ${
            theme === "light" ? "bg-gray-200" : "bg-gray-700"
          } `}
        >
          <HeaderLayout />

          <Layout.Content
            className={`flex-1 md:p-7 p-2 overflow-auto rounded-md ${
              theme === "light"
                ? "bg-white text-black"
                : "bg-[#001529] text-white"
            }`}
          >
            {children}
          </Layout.Content>

          <FooterLayout />
        </Layout>
      </main>
    </ConfigProvider>
  );
};

export default LayoutBase;
