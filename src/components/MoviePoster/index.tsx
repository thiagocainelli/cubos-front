import { useNavigate } from "react-router-dom";
import Button from "../Button";
import CardInfo from "../CardInfo";
import Text from "../Text";
import { ArrowLeft } from "lucide-react";

interface MoviePosterProps {
  movie: ReadMovieDto;
}

const MoviePoster = ({ movie }: MoviePosterProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center lg:items-start space-y-4">
      <div className="w-full md:w-auto flex">
        <Button
          variant="secondary"
          onClick={() => navigate("/movies")}
          className="flex items-center justify-center gap-2 w-full"
        >
          <ArrowLeft size={16} />
          Voltar para Filmes
        </Button>
      </div>

      <div className=" flex-col gap-1 md:flex hidden">
        {/* Título principal */}
        <Text size="xlarge" weight="bold">
          {movie?.title || "Nome do Filme"}
        </Text>

        {/* Título original */}
        <Text size="medium">
          Título original:{" "}
          {movie?.originalTitle || movie?.title || "Nome do Filme"}
        </Text>
      </div>

      <div className="flex gap-4 w-full">
        <div className="relative w-full  md:max-w-md">
          <img
            src={movie?.posterUrl || "/images/default-movie.jpg"}
            alt={movie?.title || "Poster do filme"}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="w-full hidden md:flex flex-col gap-4">
          <CardInfo title="Sinopse" content={movie?.synopsis} />
          <CardInfo
            title="Gêneros"
            content={""}
            genders={movie?.genre.map((genre: any) => genre)}
          />
        </div>
      </div>
    </div>
  );
};

export default MoviePoster;
