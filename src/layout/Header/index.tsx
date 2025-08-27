import { useContext } from "react";
import { Switch } from "antd";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { ThemeContext } from "../../contexts/ThemeContext";

const HeaderLayout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="md:py-4 py-2">
      <div
        className={`flex items-center justify-between rounded-[10px] px-4 py-3 flex-wrap gap-5 ${
          theme === "light" ? "bg-white text-black" : "bg-[#001529] text-white"
        }`}
      >
        <div className="flex items-center gap-5 flex-wrap">
          <Switch
            checkedChildren={<MoonFilled />}
            unCheckedChildren={<SunFilled />}
            checked={theme === "light" ? false : true}
            onChange={toggleTheme}
            style={{
              backgroundColor: theme === "light" ? "#FFD700" : "#001f3f",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
