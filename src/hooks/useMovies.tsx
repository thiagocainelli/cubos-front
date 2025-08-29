import { useState, useEffect, useCallback, useMemo } from "react";
import {
  createMovie,
  updateMovie,
  getMovieByUuid,
  getMoviesListAndSearch,
  deleteMovie,
} from "../services/movies.service";
import { useToast } from "../contexts/ToastContext";

interface UseMoviesReturn {
  movies: ReadMovieDto[];
  totalMovies: number;
  loading: boolean;
  error: string | null;
  movieDetails: ReadMovieDto | null;

  currentPage: number;
  itemsPerPage: number;

  searchQuery: string;
  selectedSituation: MovieSituation | undefined;
  selectedGenre: string | undefined;

  fetchMovies: (page?: number, itemsPerPage?: number) => Promise<void>;
  fetchMovieByUuid: (uuid: string) => Promise<ReadMovieDto | null>;
  createMovie: (data: CreateMovieDto) => Promise<boolean>;
  updateMovie: (uuid: string, data: UpdateMovieDto) => Promise<boolean>;
  deleteMovie: (uuid: string) => Promise<boolean>;

  searchMovies: (query: string) => void;
  filterBySituation: (situation: MovieSituation | undefined) => void;
  filterByGenre: (genre: string | undefined) => void;
  filterByDuration: (startDuration: number, endDuration: number) => void;
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;

  clearError: () => void;
  resetFilters: () => void;
}

const useMovies = (): UseMoviesReturn => {
  const { showSuccess, showError } = useToast();

  const [moviesState, setMoviesState] = useState({
    movies: [] as ReadMovieDto[],
    totalMovies: 0,
    loading: false,
    error: null as string | null,
  });

  const [movieDetails, setMovieDetails] = useState<ReadMovieDto | null>(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
  });

  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedSituation: undefined as MovieSituation | undefined,
    selectedGenre: undefined as string | undefined,
    startDuration: undefined as number | undefined,
    endDuration: undefined as number | undefined,
  });

  const apiParams = useMemo(
    () => ({
      page: pagination.currentPage,
      itemsPerPage: pagination.itemsPerPage,
      search: filters.searchQuery || undefined,
      situation: filters.selectedSituation,
      genre: filters.selectedGenre,
      startDuration: filters.startDuration,
      endDuration: filters.endDuration,
    }),
    [
      pagination.currentPage,
      pagination.itemsPerPage,
      filters.searchQuery,
      filters.selectedSituation,
      filters.selectedGenre,
      filters.startDuration,
      filters.endDuration,
    ]
  );

  const fetchMovies = useCallback(
    async (page?: number, itemsPerPage?: number) => {
      try {
        setMoviesState((prev) => ({ ...prev, loading: true, error: null }));

        const pageToUse = page || pagination.currentPage;
        const itemsPerPageToUse = itemsPerPage || pagination.itemsPerPage;

        const response = await getMoviesListAndSearch(
          pageToUse,
          itemsPerPageToUse,
          filters.searchQuery || undefined,
          filters.selectedSituation,
          filters.selectedGenre,
          filters.startDuration,
          filters.endDuration
        );

        if (response && response.data) {
          setMoviesState((prev) => ({
            ...prev,
            movies: response.data,
            totalMovies: response.total,
            loading: false,
          }));

          setPagination((prev) => ({
            ...prev,
            currentPage: pageToUse,
            itemsPerPage: itemsPerPageToUse,
          }));
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao buscar filmes";
        setMoviesState((prev) => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
        showError("Erro", errorMessage);
      }
    },
    [apiParams, showError]
  );

  const searchMovies = (query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const filterBySituation = (situation: MovieSituation | undefined) => {
    setFilters((prev) => ({ ...prev, selectedSituation: situation }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const filterByGenre = (genre: string | undefined) => {
    setFilters((prev) => ({ ...prev, selectedGenre: genre }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const filterByDuration = (startDuration: number, endDuration: number) => {
    setFilters((prev) => ({ ...prev, startDuration, endDuration }));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const setPage = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const setItemsPerPage = (newItemsPerPage: number) => {
    setPagination((prev) => ({
      ...prev,
      itemsPerPage: newItemsPerPage,
      currentPage: 1,
    }));
  };

  const clearError = () => {
    setMoviesState((prev) => ({ ...prev, error: null }));
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: "",
      selectedSituation: undefined,
      selectedGenre: undefined,
      startDuration: undefined,
      endDuration: undefined,
    });
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const createMovieHandler = useCallback(
    async (data: CreateMovieDto): Promise<boolean> => {
      try {
        setMoviesState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await createMovie(data);

        if (response) {
          showSuccess("Sucesso", "Filme criado com sucesso!");

          await fetchMovies();
          return true;
        } else {
          throw new Error("Erro ao criar filme");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao criar filme";
        setMoviesState((prev) => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
        showError("Erro", errorMessage);
        return false;
      }
    },
    [fetchMovies, showSuccess, showError]
  );

  const updateMovieHandler = useCallback(
    async (uuid: string, data: UpdateMovieDto): Promise<boolean> => {
      try {
        setMoviesState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await updateMovie(uuid, data);

        if (response) {
          showSuccess("Sucesso", "Filme atualizado com sucesso!");

          await fetchMovies();
          return true;
        } else {
          throw new Error("Erro ao atualizar filme");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao atualizar filme";
        setMoviesState((prev) => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
        showError("Erro", errorMessage);
        return false;
      }
    },
    [fetchMovies, showSuccess, showError]
  );

  const deleteMovieHandler = useCallback(
    async (uuid: string): Promise<boolean> => {
      try {
        setMoviesState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await deleteMovie(uuid);

        if (response !== undefined) {
          showSuccess("Sucesso", "Filme excluído com sucesso!");

          await fetchMovies();
          return true;
        } else {
          throw new Error("Erro ao excluir filme");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao excluir filme";
        setMoviesState((prev) => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
        showError("Erro", errorMessage);
        return false;
      }
    },
    [fetchMovies, showSuccess, showError]
  );

  const fetchMovieByUuid = useCallback(
    async (uuid: string): Promise<ReadMovieDto | null> => {
      try {
        setMoviesState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await getMovieByUuid(uuid);

        if (response) {
          setMoviesState((prev) => ({ ...prev, loading: false }));
          setMovieDetails(response);
          return response;
        } else {
          throw new Error("Erro ao buscar filme");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao buscar filme";
        setMoviesState((prev) => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
        showError("Erro", errorMessage);
        return null;
      }
    },
    [showError]
  );

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return {
    movies: moviesState.movies,
    totalMovies: moviesState.totalMovies,
    loading: moviesState.loading,
    error: moviesState.error,
    movieDetails,
    currentPage: pagination.currentPage,
    itemsPerPage: pagination.itemsPerPage,

    searchQuery: filters.searchQuery,
    selectedSituation: filters.selectedSituation,
    selectedGenre: filters.selectedGenre,

    fetchMovies,
    fetchMovieByUuid,
    createMovie: createMovieHandler,
    updateMovie: updateMovieHandler,
    deleteMovie: deleteMovieHandler,

    searchMovies,
    filterBySituation,
    filterByGenre,
    filterByDuration,

    setPage,
    setItemsPerPage,

    clearError,
    resetFilters,
  };
};

export default useMovies;
