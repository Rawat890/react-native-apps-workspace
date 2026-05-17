import { Movie } from '../api/types';

export const updatedArr = (arr: Movie[]) => {
  return arr.map(item => {
    return {
      id: item.id,
      title: item.title,
      poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      overview: item?.overview
    };
  });
};