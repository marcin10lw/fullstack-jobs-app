/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { convertBoundingBoxToBounds } from 'src/lib/helpers/map';

const OPENSTREET_SEARCH_URL = 'https://nominatim.openstreetmap.org/search';

const SearchMap = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState<Record<
    string,
    any
  > | null>(null);

  const map = useMap();

  const getSearchData = async () => {
    const { data } = await axios.get(OPENSTREET_SEARCH_URL, {
      params: {
        q: query,
        format: 'jsonv2',
      },
    });

    setSearchResults(data);
  };

  useEffect(() => {
    if (query === '') {
      setSearchResults([]);
      setSelectedResult(null);
    }
  }, [query]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      !!query && getSearchData();
    }, 500);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const onResultClick = (result: any) => {
    setSelectedResult(result);
    map.flyToBounds(convertBoundingBoxToBounds(result.boundingbox as string[]));
    setQuery('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          value={selectedResult?.display_name ?? query}
          onChange={({ target }) => setQuery(target.value)}
          placeholder="Search"
          className="h-[36px] w-full bg-secondary pr-9"
        />
        <Button
          variant="link"
          className="absolute right-0 top-0 h-[36px] px-2"
          onClick={() => setQuery('')}
        >
          <X className="size-4 text-muted-foreground" />
        </Button>
      </div>
      {searchResults.length > 0 && (
        <ul className="absolute top-[calc(36px+8px)] w-full rounded-md bg-secondary p-2">
          {searchResults.map((result: any) => (
            <li key={result.place_id}>
              <button
                onClick={() => onResultClick(result)}
                className="w-full cursor-pointer truncate rounded-md p-2 text-start hover:bg-slate-700"
              >
                {result.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchMap;
