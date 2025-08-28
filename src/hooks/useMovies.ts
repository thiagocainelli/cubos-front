import { useState, useEffect, useCallback, useMemo } from "react";
import { notification } from "antd";
import {
  createMovie,
  updateMovie,
  getMovieByUuid,
  getMoviesListAndSearch,
  deleteMovie,
} from "../services/movies.service";

interface UseMoviesReturn {
  // State
  movies: ReadMovieDto[];
  totalMovies: number;
  loading: boolean;
  error: string | null;
  movieDetails: ReadMovieDto | null;
  // Pagination
  currentPage: number;
  itemsPerPage: number;

  // Search and Filters
  searchQuery: string;
  selectedSituation: MovieSituation | undefined;
  selectedGenre: string | undefined;

  // Actions
  fetchMovies: (page?: number, itemsPerPage?: number) => Promise<void>;
  fetchMovieByUuid: (uuid: string) => Promise<ReadMovieDto | null>;
  createMovie: (data: CreateMovieDto) => Promise<boolean>;
  updateMovie: (data: UpdateMovieDto) => Promise<boolean>;
  deleteMovie: (uuid: string) => Promise<boolean>;

  // Search and Filter
  searchMovies: (query: string) => void;
  filterBySituation: (situation: MovieSituation | undefined) => void;
  filterByGenre: (genre: string | undefined) => void;

  // Pagination
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;

  // Utils
  clearError: () => void;
  resetFilters: () => void;
}

const useMovies = (): UseMoviesReturn => {
  // Consolidate related state into objects for better performance
  const [state, setState] = useState({
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
  });

  const apiParams = useMemo(
    () => ({
      page: pagination.currentPage,
      itemsPerPage: pagination.itemsPerPage,
      search: filters.searchQuery || undefined,
      situation: filters.selectedSituation,
      genre: filters.selectedGenre,
    }),
    [
      pagination.currentPage,
      pagination.itemsPerPage,
      filters.searchQuery,
      filters.selectedSituation,
      filters.selectedGenre,
    ]
  );

  const fetchMovies = useCallback(
    async (page?: number, itemsPerPage?: number) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const pageToUse = page || pagination.currentPage;
        const itemsPerPageToUse = itemsPerPage || pagination.itemsPerPage;

        const response = await getMoviesListAndSearch(
          pageToUse,
          itemsPerPageToUse,
          filters.searchQuery || undefined,
          filters.selectedSituation,
          filters.selectedGenre
        );

        if (response && response.data) {
          setState((prev) => ({
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
        setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
        notification.error({
          message: "Erro",
          description: errorMessage,
          placement: "bottomRight",
        });
      }
    },
    [apiParams]
  );

  // Simple state setters - no need for useCallback
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
    setState((prev) => ({ ...prev, error: null }));
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: "",
      selectedSituation: undefined,
      selectedGenre: undefined,
    });
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const createMovieHandler = useCallback(
    async (data: CreateMovieDto): Promise<boolean> => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await createMovie(data);

        if (response) {
          notification.success({
            message: "Sucesso",
            description: "Filme criado com sucesso!",
            placement: "bottomRight",
          });

          await fetchMovies();
          return true;
        } else {
          throw new Error("Erro ao criar filme");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao criar filme";
        setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
        notification.error({
          message: "Erro",
          description: errorMessage,
          placement: "bottomRight",
        });
        return false;
      }
    },
    [fetchMovies]
  );

  const updateMovieHandler = useCallback(
    async (data: UpdateMovieDto): Promise<boolean> => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await updateMovie(data);

        if (response) {
          notification.success({
            message: "Sucesso",
            description: "Filme atualizado com sucesso!",
            placement: "bottomRight",
          });

          await fetchMovies();
          return true;
        } else {
          throw new Error("Erro ao atualizar filme");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao atualizar filme";
        setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
        notification.error({
          message: "Erro",
          description: errorMessage,
          placement: "bottomRight",
        });
        return false;
      }
    },
    [fetchMovies]
  );

  const deleteMovieHandler = useCallback(
    async (uuid: string): Promise<boolean> => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await deleteMovie(uuid);

        if (response !== undefined) {
          notification.success({
            message: "Sucesso",
            description: "Filme excluído com sucesso!",
            placement: "bottomRight",
          });

          await fetchMovies();
          return true;
        } else {
          throw new Error("Erro ao excluir filme");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao excluir filme";
        setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
        notification.error({
          message: "Erro",
          description: errorMessage,
          placement: "bottomRight",
        });
        return false;
      }
    },
    [fetchMovies]
  );

  const fetchMovieByUuid = useCallback(
    async (uuid: string): Promise<ReadMovieDto | null> => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await getMovieByUuid(uuid);

        if (response) {
          setState((prev) => ({ ...prev, loading: false }));
          setMovieDetails(response);
          return response;
        } else {
          throw new Error("Erro ao buscar filme");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao buscar filme";
        setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
        notification.error({
          message: "Erro",
          description: errorMessage,
          placement: "bottomRight",
        });
        return null;
      }
    },
    []
  );

  // Fetch movies when filters change
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return {
    // State
    movies: state.movies,
    totalMovies: state.totalMovies,
    loading: state.loading,
    error: state.error,
    movieDetails,
    // Pagination
    currentPage: pagination.currentPage,
    itemsPerPage: pagination.itemsPerPage,

    // Search and Filters
    searchQuery: filters.searchQuery,
    selectedSituation: filters.selectedSituation,
    selectedGenre: filters.selectedGenre,

    // Actions
    fetchMovies,
    fetchMovieByUuid,
    createMovie: createMovieHandler,
    updateMovie: updateMovieHandler,
    deleteMovie: deleteMovieHandler,

    // Search and Filter
    searchMovies,
    filterBySituation,
    filterByGenre,

    // Pagination
    setPage,
    setItemsPerPage,

    // Utils
    clearError,
    resetFilters,
  };
};

export default useMovies;
