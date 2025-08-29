import { Layout } from "antd";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

const FooterLayout = () => {
  const { theme } = useContext(ThemeContext);
  const actualYear = new Date().getFullYear();

  const getFooterStyles = () => {
    return {
      borderTop:
        theme === "light"
          ? "1px solid var(--mauve-3)"
          : "1px solid var(--mauve-dark-6)",
      backdropFilter: "blur(10px)",
    };
  };

  return (
    <Layout.Footer className={`text-center p-[16px]`} style={getFooterStyles()}>
      <p className="font-thin">
        {actualYear} © Todos os direitos reservados a{" "}
        <span className="font-bold">Cubos Movies</span>
      </p>
    </Layout.Footer>
  );
};

export default FooterLayout;
