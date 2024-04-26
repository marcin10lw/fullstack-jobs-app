import { X } from 'lucide-react';
import { useMap } from 'react-leaflet';

import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'src/components/ui/tooltip';
import useSearchMap from './useSearchMap';

const SearchMap = () => {
  const map = useMap();

  const { query, setQuery, onResultClick, searchResults, selectedResult } = useSearchMap();

  return (
    <div className="relative">
      <div className="relative max-w-[200px]">
        <Input
          value={selectedResult?.display_name ?? query}
          onChange={({ target }) => setQuery(target.value)}
          placeholder="Search"
          className="h-[36px] w-full bg-secondary pr-9"
        />
        <Button variant="link" className="absolute right-0 top-0 h-[36px] px-2" onClick={() => setQuery('')}>
          <X className="size-4 text-muted-foreground" />
        </Button>
      </div>
      {searchResults.length > 0 && (
        <ul
          onMouseOver={() => map.scrollWheelZoom.disable()}
          onMouseLeave={() => map.scrollWheelZoom.enable()}
          className="scrollbar-w-4 scrollbar-track scrollbar-thumb scrollbar-thumb-rounded absolute top-[calc(36px+8px)] max-h-[300px] w-full max-w-[300px] overflow-y-auto rounded-md bg-secondary p-2"
        >
          {searchResults.map((result) => (
            <li key={result.place_id}>
              <TooltipProvider>
                <Tooltip disableHoverableContent>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onResultClick(result)}
                      className="w-full cursor-pointer truncate rounded-md p-2 text-start hover:bg-background"
                    >
                      {result.display_name}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover" align="start">
                    {result.display_name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchMap;
