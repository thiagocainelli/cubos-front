import { Progress } from "antd";
import Text from "../Text";
import { useTheme } from "../../contexts/ThemeContext";

interface MoviesCardProps {
  movie: ReadMovieDto;
  onEdit?: () => void;
}

const MoviesCard = ({ movie, onEdit }: MoviesCardProps) => {
  // Simular uma porcentagem de avaliação (pode vir da API)
  const ratingPercentage =
    movie?.ratingPercentage || Math.floor(Math.random() * 100) + 1;

  const theme = useTheme();

  return (
    <div
      key={movie.uuid}
      style={{
        backgroundImage: `url(${
          movie?.posterUrl || "/images/default-movie.jpg"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: "4px",
      }}
      className="relative cursor-pointer h-[400px] rounded-lg group overflow-hidden"
      onClick={onEdit}
    >
      {/* Overlay escuro base */}
      <div className="absolute inset-0 bg-black bg-opacity-5 group-hover:bg-opacity-20 transition-all duration-300" />

      {/* Indicador de porcentagem no hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="relative ">
          <Progress
            className="bg-transparent backdrop-blur-sm"
            type="circle"
            percent={ratingPercentage}
            strokeColor={{
              "0%": "#ffc107",
              "100%": "#ffc107",
            }}
          />
        </div>
      </div>

      {/* Informações do filme na parte inferior */}
      <div className="absolute bottom-2 left-0 right-0 px-2 z-10">
        <div
          className={`flex flex-col ${
            theme.theme === "dark" ? "bg-black/50" : "bg-white/50"
          } p-1 rounded-[4px] `}
        >
          <Text
            size="large"
            weight="bold"
            className="text-white text-xl leading-tight mb-1"
          >
            {movie?.title || "Nome do Filme"}
          </Text>

          {/* Gênero do filme */}
          {movie?.genre && movie.genre.length > 0 && (
            <Text size="small" className="text-white text-opacity-80">
              {movie.genre.map((genre) => genre).join("/")}
            </Text>
          )}
        </div>
      </div>

      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 bg-transparent group-hover:bg-opacity-40 transition-all duration-300" />
    </div>
  );
};

export default MoviesCard;
