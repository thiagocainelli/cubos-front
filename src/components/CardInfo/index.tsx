import { useTheme } from "../../contexts/ThemeContext";
import Text from "../Text";

interface CardInfoProps {
  title: string;
  content: string;
  genders?: string[];
}

const CardInfo = ({ title, content, genders = [] }: CardInfoProps) => {
  const { theme } = useTheme();

  const backgroundColor =
    theme === "dark"
      ? {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }
      : {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        };

  return (
    <div
      className={`flex flex-col p-[16px] rounded-[4px] `}
      style={backgroundColor}
    >
      <Text size="large" weight="bold">
        {title}
      </Text>

      {/* Gênero do filme */}
      {content && !genders.length && <Text size="small">{content}</Text>}

      {genders.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          <div className="flex items-center gap-2">
            {genders.map((gender) => (
              <div
                style={{
                  backgroundColor: "var(--button-bg-secondary)",
                }}
                className="flex items-center gap-2 rounded-[4px] p-[4px]"
              >
                <Text size="small">{gender}</Text>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardInfo;
