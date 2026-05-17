import React, { useEffect, useState } from 'react';
import { getUpcomingMovies } from '../api/tmdbAPI';
import { Movie } from '../api/types';
import VerticalList from '../components/VerticalList';
import { updatedArr } from '../utils/helper';

export default function Upcoming() {
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {

        const upcoming = await getUpcomingMovies();
        setData(updatedArr(upcoming));

      } catch (error) {
        console.error('Failed to fetch upcoming movies:', error);
      }
    }

    fetchData();
  }, []);

  const onDelete = (val: Movie) => {
    let newData = [...data.filter(element => element.id != val.id)]
    setData(newData)
  }

  return (
    <VerticalList title="Upcoming Movies" data={data} onDelete={onDelete} />
  )
}

