import { MoonFilled, SunFilled } from "@ant-design/icons";
import { useTheme } from "../../contexts/ThemeContext";
import Square from "../../../public/images/square.png";
import LetterC from "../../../public/images/letter-c.png";
import LetterU from "../../../public/images/letter-u.png";
import LetterB from "../../../public/images/letter-b.png";
import LetterO from "../../../public/images/letter-o.png";
import LetterS from "../../../public/images/letter-s.png";
import Button from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const HeaderLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOutData } = useAuth();

  const navigate = useNavigate();

  const getHeaderStyles = () => {
    return {
      borderBottom:
        theme === "light"
          ? "1px solid var(--mauve-3)"
          : "1px solid var(--mauve-dark-6)",
      backdropFilter: "blur(10px)",
      color: theme === "light" ? "var(--mauve-10)" : "var(--mauve-4)",
    };
  };

  return (
    <div
      className={`flex items-center justify-between p-2 flex-wrap gap-5`}
      style={getHeaderStyles()}
    >
      <div className="flex items-center gap-5 flex-wrap">
        <div
          onClick={() => navigate("/movies")}
          className="flex items-center gap-4 cursor-pointer"
        >
          <div className="flex items-center gap-1">
            <img
              src={Square}
              alt="Square"
              className="w-[35px] h-[35px] md:mr-2 mr-0"
            />
            <img
              src={LetterC}
              alt="Letter C"
              className="w-[20px] h-[20px] md:block hidden"
            />
            <img
              src={LetterU}
              alt="Letter U"
              className="w-[20px] h-[20px] md:block hidden"
            />
            <img
              src={LetterB}
              alt="Letter B"
              className="w-[20px] h-[20px] md:block hidden"
            />
            <img
              src={LetterO}
              alt="Letter O"
              className="w-[20px] h-[20px] md:block hidden"
            />
            <img
              src={LetterS}
              alt="Letter S"
              className="w-[20px] h-[20px] md:block hidden"
            />
          </div>
          <p
            className="text-[20px] font-bold"
            style={{
              color: "var(--mauve-2)",
            }}
          >
            Movies
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="secondary" onClick={toggleTheme}>
          {theme === "light" ? <MoonFilled /> : <SunFilled />}
        </Button>

        {user && (
          <Button variant="primary" onClick={() => signOutData()}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderLayout;
