import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import axios from 'axios';

import { convertBoundingBoxToBounds } from 'src/lib/helpers/map';

const OPENSTREET_SEARCH_URL = 'https://nominatim.openstreetmap.org/search';

interface SearchResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
}

const useSearchMap = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null,
  );

  const map = useMap();

  const getSearchData = async () => {
    const { data } = await axios.get(OPENSTREET_SEARCH_URL, {
      params: {
        q: query,
        format: 'jsonv2',
      },
    });

    setSearchResults(data as SearchResult[]);
  };

  useEffect(() => {
    if (query === '') {
      setSearchResults([]);
      setSelectedResult(null);
      map.scrollWheelZoom.enable();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      !!query && getSearchData();
    }, 500);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const onResultClick = (result: SearchResult) => {
    setSelectedResult(result);
    map.flyToBounds(convertBoundingBoxToBounds(result.boundingbox));
    setQuery('');
  };

  return {
    query,
    setQuery,
    selectedResult,
    searchResults,
    onResultClick,
  };
};

export default useSearchMap;
