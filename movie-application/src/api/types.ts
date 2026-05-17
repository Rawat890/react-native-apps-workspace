export type Movie = {
  id: number;
  title?: string;
  overview?: string;
  poster_path?: string;
  description?: string;
}

export  type MoviesListResponse = {
  page?: number;
 results?: Movie[];
}