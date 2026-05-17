import axios from "axios";
import { apiClient } from "./axios";
import { youtubaseSearchURl, youtubeKey } from "./config";
import { Movie, MoviesListResponse } from "./types";


export const getPopularMovies = async ():Promise<Movie[]> => {
    
   const response =  await apiClient.get<MoviesListResponse>("/movie/popular?language=en-US&page=1")
   return response?.data.results || [];
}

export const getUpcomingMovies = async ():Promise<Movie[]> => {
    
    const response =  await apiClient.get<MoviesListResponse>("/movie/upcoming?language=en-US&page=1")
    return response?.data.results || [];
 }
 
 export const getTopRatedMovies = async ():Promise<Movie[]> => {    

    const response =  await apiClient.get<MoviesListResponse>("/movie/top_rated?language=en-US&page=1")
    return response?.data.results || [];    
 }

 export const getnowPlayingMovies = async ():Promise<Movie[]> => {    
    const response =  await apiClient.get<MoviesListResponse>("/movie/now_playing?language=en-US&page=1")
    return response?.data.results || [];    
 }

 // search movies

 export const searchMovies = async (text:string):Promise<Movie[]> =>{

  const response = await apiClient.get<MoviesListResponse>(`/search/movie?query=${text}&include_adult=false&language=en-US&page=1`)

   return response?.data?.results || []

 }


 export const getVideoId = async (searchValue:string) =>{


    const res= await axios.get(youtubaseSearchURl+`?q=${searchValue} trailer&key=${youtubeKey}`)
return res?.data
 }
 