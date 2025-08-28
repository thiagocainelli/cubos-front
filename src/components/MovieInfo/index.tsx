import { Progress } from "antd";
import Text from "../Text";
import Button from "../Button";
import { useTheme } from "../../contexts/ThemeContext";
import CardInfo from "../CardInfo";
import dayjs from "dayjs";

interface MovieInfoProps {
  movie: ReadMovieDto;
  onEdit: () => void;
  onDelete: () => void;
}

const MovieInfo = ({ movie, onEdit, onDelete }: MovieInfoProps) => {
  const { theme } = useTheme();

  const formatCurrency = (value: number) => {
    if (!value) return "N/A";
    return (
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value / 1000000) + "M"
    );
  };

  const formatDuration = (minutes: number) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins.toString().padStart(2, "0")}m`;
  };

  const getSituationText = (situation: number) => {
    switch (situation) {
      case 0:
        return "Em breve";
      case 1:
        return "Lançado";
      case 2:
        return "Cancelado";
      default:
        return "N/A";
    }
  };

  const getLanguageText = (language: string) => {
    const languages: { [key: string]: string } = {
      "pt-BR": "Português",
      "en-US": "Inglês",
      "es-ES": "Espanhol",
      "fr-FR": "Francês",
      "de-DE": "Alemão",
      "it-IT": "Italiano",
      "ja-JP": "Japonês",
      "ko-KR": "Coreano",
      "zh-CN": "Chinês",
    };
    return languages[language] || language;
  };

  return (
    <div className="space-y-6">
      {/* Botões de ação */}
      <div className="md:flex justify-end space-x-3 hidden">
        <Button variant="secondary" onClick={onDelete}>
          Deletar
        </Button>
        <Button variant="primary" onClick={onEdit}>
          Editar
        </Button>
      </div>

      {/* Popularidade e votos */}
      <div className="flex md:flex-row flex-col md:justify-end md:items-center gap-4">
        <CardInfo title="Popularidade" content={String(movie?.popularity)} />

        <CardInfo title="Votos" content={String(movie?.votesQuantity)} />

        <Progress
          type="circle"
          percent={movie?.ratingPercentage || 0}
          strokeColor={{
            "0%": "#ffc107",
            "100%": "#ffc107",
          }}
          strokeWidth={8}
          size={120}
          format={(percent) => (
            <div className="text-center">
              <Text size="large" weight="bold" className="text-white text-3xl">
                {percent}%
              </Text>
              <div className="w-2 h-2 bg-yellow-400 rounded-full mx-auto mt-1" />
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardInfo
          title="Lançamento"
          content={
            movie?.releaseDate
              ? dayjs(movie.releaseDate).format("DD/MM/YYYY")
              : "N/A"
          }
        />

        <CardInfo
          title="Duração"
          content={formatDuration(movie?.durationInMinutes)}
        />

        <CardInfo
          title="Situação"
          content={getSituationText(movie?.situation)}
        />

        <CardInfo title="Idioma" content={getLanguageText(movie?.language)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardInfo title="Orçamento" content={formatCurrency(movie?.budget)} />

        <CardInfo title="Receita" content={formatCurrency(movie?.revenue)} />

        <CardInfo title="Lucro" content={String(movie?.profit)} />
      </div>
    </div>
  );
};

export default MovieInfo;
