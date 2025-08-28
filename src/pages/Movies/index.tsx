import { useState } from "react";
import { Button, Input, Pagination, FiltersModal } from "../../components";
import MoviesCard from "../../components/MoviesCard";
import LayoutBase from "../../layout";
import useMovies from "../../hooks/useMovies";
import { SearchOutlined } from "@ant-design/icons";
import Text from "../../components/Text";
import MovieDrawer from "../../components/MovieDrawer";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const MoviesPage = () => {
  const { theme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<any>({});
  const navigate = useNavigate();

  const {
    movies,
    totalMovies,
    loading,
    error,
    searchQuery,

    searchMovies,
    filterBySituation,
    filterByGenre,
    resetFilters,
    fetchMovies,
    currentPage,
    itemsPerPage,
    setPage,
  } = useMovies();

  const handleSearch = (value: string) => {
    searchMovies(value);
  };

  const handleFilterClick = () => {
    setFiltersModalOpen(true);
  };

  const handleFiltersClose = () => {
    setFiltersModalOpen(false);
  };

  const handleApplyFilters = (filters: any) => {
    setCurrentFilters(filters);

    // Aplicar filtros usando o hook
    if (filters.genre) {
      filterByGenre(filters.genre);
    }
    if (filters.situation !== "") {
      filterBySituation(filters.situation);
    }

    // TODO: Implementar filtro de duração no hook useMovies
    console.log("Filtros aplicados:", filters);

    // Fechar modal e resetar página
    setFiltersModalOpen(false);
    setPage(1);
  };

  const handleResetFilters = () => {
    resetFilters();
    setCurrentFilters({});
    setPage(1);
  };

  const handleAddMovie = () => {
    setDrawerMode("create");
    setSelectedMovie(null);
    setDrawerOpen(true);
  };

  const handleEditMovie = (movie: any) => {
    navigate(`/movies/details?uuid=${movie.uuid}`);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedMovie(null);
  };

  const handleDrawerSuccess = () => {
    // Recarregar a lista de filmes após criar/editar
    fetchMovies();
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  // Calcular total de páginas
  const totalPages = Math.ceil(totalMovies / itemsPerPage);

  return (
    <LayoutBase>
      <div className="flex-1 flex max-w-7xl">
        <div className="w-full rounded-[4px]">
          {/* Header com busca e ações */}
          <div className="flex md:flex-row flex-col md:items-center md:justify-end gap-4 mb-8">
            <Input
              placeholder="Buscar filmes..."
              value={searchQuery}
              onChange={handleSearch}
              size="small"
              className="max-w-md"
              suffixIcon={<SearchOutlined className="text-gray-500" />}
            />

            <Button variant="secondary" onClick={handleFilterClick}>
              Filtros
            </Button>
            <Button variant="primary" onClick={handleAddMovie}>
              Adicionar Filme
            </Button>
          </div>

          {/* Lista de filmes */}
          <div
            className={`p-[24px] ${
              theme === "light" ? "bg-[#ffff]/50" : "bg-[#EBEAF814]"
            } rounded-[4px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}
          >
            {loading ? (
              // Loading state
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div
                    className={`${
                      theme === "light" ? "bg-gray-200" : "bg-gray-600"
                    } h-64 rounded-lg mb-2`}
                  ></div>
                  <div
                    className={`${
                      theme === "light" ? "bg-gray-200" : "bg-gray-600"
                    } h-4 rounded w-3/4 mb-2`}
                  ></div>
                  <div
                    className={`${
                      theme === "light" ? "bg-gray-200" : "bg-gray-600"
                    } h-3 rounded w-1/2`}
                  ></div>
                </div>
              ))
            ) : movies.length > 0 ? (
              // Movies list
              movies.map((movie) => (
                <MoviesCard
                  key={movie.uuid}
                  movie={movie}
                  onEdit={() => handleEditMovie(movie)}
                />
              ))
            ) : (
              // Empty state
              <div className="col-span-full text-center py-12">
                <Text size="large">
                  {searchQuery
                    ? "Nenhum filme encontrado para sua busca."
                    : "Nenhum filme cadastrado ainda."}
                </Text>
                {searchQuery && (
                  <Button variant="secondary" onClick={resetFilters}>
                    Limpar busca
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Error state */}
          {error && (
            <div className="text-center py-8">
              <div className="text-red-500 text-lg mb-2">
                Erro ao carregar filmes
              </div>
              <div className="text-gray-600">{error}</div>
            </div>
          )}

          {/* Paginação */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        </div>
      </div>

      {/* Movie Drawer */}
      <MovieDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        mode={drawerMode}
        initialValues={selectedMovie}
        onSuccess={handleDrawerSuccess}
      />

      {/* Filters Modal */}
      <FiltersModal
        open={filtersModalOpen}
        onClose={handleFiltersClose}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
        initialFilters={currentFilters}
      />
    </LayoutBase>
  );
};

export default MoviesPage;
