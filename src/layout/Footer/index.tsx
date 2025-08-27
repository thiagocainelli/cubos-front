import { Layout } from "antd";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

const FooterLayout = () => {
  const { theme } = useContext(ThemeContext);
  const actualYear = new Date().getFullYear();

  return (
    <Layout.Footer
      className={`text-center md:my-4 my-2 rounded-[10px] ${
        theme === "light" ? "bg-white text-black" : "bg-[#001529] text-white"
      }`}
    >
      <p>Cubos Tecnologia / Thiago Cainelli - {actualYear}</p>
    </Layout.Footer>
  );
};

export default FooterLayout;
