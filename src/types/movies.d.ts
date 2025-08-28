enum MovieSituation {
  upcoming,
  released,
  canceled,
}

type CreateMovieDto = {
  title?: string;
  originalTitle?: string;
  language?: string;
  situation?: MovieSituation;
  synopsis?: string;
  popularity?: number;
  votesQuantity?: number;
  ratingPercentage?: number;
  trailerUrl?: string;
  posterUrl?: string;
  budget?: number;
  revenue?: number;
  profit?: number;
  releaseDate?: Date;
  durationInMinutes?: number;
  genre?: string[];
  posterUuid?: string;
  userUuid?: string;
};

type ReadMovieDto = {
  uuid: string;
  title: string;
  originalTitle: string;
  language: string;
  situation: MovieSituation;
  synopsis: string;
  popularity: number;
  votesQuantity: number;
  ratingPercentage: number;
  trailerUrl: string;
  posterUrl: string;
  budget: number;
  revenue: number;
  profit: number;
  releaseDate: Date;
  durationInMinutes: number;
  genre: string[];
  posterUuid: string;
  userUuid: string;
  createdAt: Date;
  updatedAt: Date;
};

type UpdateMovieDto = {
  title?: string;
  originalTitle?: string;
  language?: string;
  situation?: MovieSituation;
  synopsis?: string;
  popularity?: number;
  votesQuantity?: number;
  ratingPercentage?: number;
  trailerUrl?: string;
  posterUrl?: string;
  budget?: number;
  revenue?: number;
  profit?: number;
  releaseDate?: Date;
  durationInMinutes?: number;
  genre?: string[];
  posterUuid?: string;
};

type ListMoviesDto = {
  data: ReadMovieDto[];
  total: number;
};
