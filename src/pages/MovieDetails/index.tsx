import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

import LayoutBase from "../../layout";
import useMovies from "../../hooks/useMovies";
import {
  MoviePoster,
  MovieInfo,
  MovieTrailer,
  MovieDrawer,
  Button,
  DeleteConfirmModal,
} from "../../components";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import Text from "../../components/Text";

const MovieDetailsPage = () => {
  const { uuid } = queryString.parse(window.location.search);
  const navigate = useNavigate();

  const { theme } = useTheme();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("edit");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { fetchMovieByUuid, movieDetails, deleteMovie } = useMovies();

  useEffect(() => {
    if (uuid) {
      fetchMovieByUuid(uuid as string);
    }
  }, [uuid, fetchMovieByUuid]);

  const handleEdit = () => {
    setDrawerMode("edit");
    setDrawerOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      await deleteMovie(uuid as string);
      showSuccess("Filme excluído com sucesso!");
      navigate("/movies");
    } catch (error) {
      showError("Erro ao excluir filme. Tente novamente mais tarde.");
    } finally {
      setDeleteLoading(false);
      setDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerSuccess = () => {
    if (uuid) {
      fetchMovieByUuid(uuid as string);
    }
    setDrawerOpen(false);
  };

  if (!movieDetails) {
    return (
      <LayoutBase>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando detalhes do filme...</p>
          </div>
        </div>
      </LayoutBase>
    );
  }

  return (
    <LayoutBase>
      <div className="absolute inset-0 z-0" />
      <div className="relative z-10 flex-1 flex  mx-auto">
        <div
          className="w-full rounded-[4px]"
          style={{
            backgroundColor:
              theme === "light" ? "rgba(255, 255, 255, 0.9)" : "#121113",
          }}
        >
          <div
            style={{
              backgroundColor:
                theme === "light"
                  ? "var(--mauve-dark-10)"
                  : "var(--mauve-dark-3)", //rgba(0, 0, 0, 0.9)
              backgroundImage: `url(${
                movieDetails?.posterUrl || "/images/default-movie.jpg"
              })`,

              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundBlendMode: "overlay",
            }}
            className="grid grid-cols-12 gap-3 rounded-[4px] p-[24px]"
          >
            <div className="col-span-12 lg:col-span-8">
              <MoviePoster movie={movieDetails} />
            </div>

            {user?.uuid === movieDetails?.userUuid && (
              <div className="md:hidden space-x-3 grid grid-cols-12 col-span-12">
                <Button
                  className="col-span-4"
                  variant="secondary"
                  onClick={handleDeleteClick}
                >
                  Deletar
                </Button>
                <Button
                  className="col-span-8"
                  variant="primary"
                  onClick={handleEdit}
                >
                  Editar
                </Button>
              </div>
            )}

            <div className="flex md:hidden flex-col  justify-center items-center col-span-12 lg:col-span-4">
              <Text size="xlarge" weight="bold">
                {movieDetails?.title}
              </Text>
              <Text size="medium">
                Título Original: {movieDetails?.originalTitle}
              </Text>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <MovieInfo
                movie={movieDetails}
                onEdit={handleEdit}
                onDelete={handleDeleteConfirm}
              />
            </div>
          </div>

          <div className="mt-4 p-[24px]">
            <MovieTrailer trailerUrl={movieDetails?.trailerUrl} />
          </div>
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
        title="Confirmar Exclusão"
        message="Tem certeza que deseja deletar este filme?"
      />

      {drawerOpen && (
        <MovieDrawer
          open={drawerOpen}
          onClose={handleDrawerClose}
          mode={drawerMode}
          initialValues={movieDetails}
          onSuccess={handleDrawerSuccess}
        />
      )}
    </LayoutBase>
  );
};

export default MovieDetailsPage;
