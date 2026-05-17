import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Movie } from '../api/types';
import VerticalList from '../components/VerticalList';
import { downloadKeyStorage } from '../utils/storage';

export default function Download() {

  const [data, setData] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadDownloads() {
      const storedData = await AsyncStorage.getItem(downloadKeyStorage);
      setData(storedData);
    }

    loadDownloads();
  }, []);


  // REPLACE onDelete
  const onDelete = async (val: Movie) => {
    let newData = [
      ...JSON.parse(data || '[]')?.filter(
        (element: Movie) => element.id != val.id,
      ),
    ];

    const updatedData = JSON.stringify(newData);

    await AsyncStorage.setItem(downloadKeyStorage, updatedData);

    setData(updatedData);
  };

  return (
      <VerticalList title="Downloads" data={JSON.parse(data || "[]")} onDelete={onDelete} />
  )
}

