import Text from "../Text";
import { useTheme } from "../../contexts/ThemeContext";

interface MovieTrailerProps {
  trailerUrl?: string;
}

const MovieTrailer = ({ trailerUrl }: MovieTrailerProps) => {
  const { theme } = useTheme();

  // Função para extrair o ID do vídeo do YouTube
  const getYouTubeVideoId = (url: string) => {
    if (!url) return null;

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = trailerUrl ? getYouTubeVideoId(trailerUrl) : null;

  console.log({ trailerUrl });
  console.log({ videoId });

  if (!videoId) {
    return (
      <div className="space-y-4">
        <Text size="xlarge" weight="bold">
          Trailer
        </Text>
        <div
          className="w-full h-64 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: "var(--mauve-dark-3)",
            border: "1px solid var(--mauve-dark-6)",
          }}
        >
          <Text size="medium" className="text-white text-opacity-70">
            Trailer não disponível
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Text size="xlarge" weight="bold">
        Trailer
      </Text>

      <div className="relative w-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Trailer do filme"
          className="w-full h-64 lg:h-96 rounded-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default MovieTrailer;
