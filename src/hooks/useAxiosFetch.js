import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const useAxiosFetch = (url, initialData = []) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initialLoadStatus = useRef(new Map());

  useEffect(() => {
    if (!initialLoadStatus.current.has(url)) {
      initialLoadStatus.current.set(url, true);
    }

    const fetchData = async () => {
      setLoading(true); 
      setError(null); 

      try {
        const response = await axios.get(url);

        if (initialLoadStatus.current.get(url)) {
          setTimeout(() => {
            setData(response.data);
            setLoading(false);
            initialLoadStatus.current.set(url, false);
          }, 2000);
        } else {
          setData(response.data);
          setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
        initialLoadStatus.current.set(url, false);
      }
    };

    fetchData();

  }, [url]);

  return { data, loading, error };
};

export default useAxiosFetch;