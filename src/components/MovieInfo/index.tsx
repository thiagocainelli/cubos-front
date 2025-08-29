import { Progress } from "antd";
import Text from "../Text";
import Button from "../Button";
import CardInfo from "../CardInfo";
import DeleteConfirmModal from "../DeleteConfirmModal";
import dayjs from "dayjs";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

interface MovieInfoProps {
  movie: ReadMovieDto;
  onEdit: () => void;
  onDelete: () => void;
}

const MovieInfo = ({ movie, onEdit, onDelete }: MovieInfoProps) => {
  const { user } = useAuth();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete();
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const formatCurrency = (value: number) => {
    if (!value) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDuration = (minutes: number) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins.toString().padStart(2, "0")}m`;
  };

  const getSituationText = (situation: string) => {
    switch (situation) {
      case "upcoming":
        return "Em breve";
      case "released":
        return "Lançado";
      case "canceled":
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

      {user?.uuid === movie?.userUuid && (
        <div className="md:flex justify-end space-x-3 hidden">
          <Button variant="secondary" onClick={handleDeleteClick}>
            Deletar
          </Button>

          <Button variant="primary" onClick={onEdit}>
            Editar
          </Button>
        </div>
      )}

      {/* Popularidade e votos */}
      <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-4">
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

      <div className="w-full md:hidden flex flex-col gap-4">
        <CardInfo title="Sinopse" content={movie?.synopsis} />
        <CardInfo
          title="Gêneros"
          content={""}
          genders={movie?.genre.map((genre: any) => genre)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <CardInfo
          title="Orçamento (USD)"
          content={formatCurrency(movie?.budget)}
        />

        <CardInfo
          title="Receita (USD)"
          content={formatCurrency(movie?.revenue)}
        />

        <CardInfo title="Lucro (USD)" content={formatCurrency(movie?.profit)} />
      </div>

      {/* Modal de confirmação de exclusão */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja deletar este filme?"
      />
    </div>
  );
};

export default MovieInfo;
