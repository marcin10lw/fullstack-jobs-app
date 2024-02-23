import { useSearchParams } from 'react-router-dom';

import ContentWrapper from 'src/components/ContentWrapper';
import Select from 'src/components/Select';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { useQueryParameter } from 'src/hooks/useQueryParameter';
import { jobStatusItems, jobTypeItems } from 'src/models/Job';
import { searchParamsDefaultValues } from './constants';

const SearchContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams(
    searchParamsDefaultValues,
  );
  const { jobStatus, jobType, search, sort } = searchParamsDefaultValues;

  const { setQuery } = useQueryParameter();

  return (
    <ContentWrapper title="Search">
      <section>
        <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:items-center lg:gap-[2rem_1rem] xl:grid-cols-3">
          <div className="relative">
            <Label htmlFor="search" className="sr-only">
              search
            </Label>
            <Input
              id="search"
              placeholder="Search"
              value={searchParams.get('search') || search}
              onChange={({ target }) => setQuery('search', target.value)}
            />
          </div>

          <Select
            label="job status"
            options={['all', ...jobStatusItems]}
            value={searchParams.get('jobStatus') || jobStatus}
            onOptionChange={(value) => setQuery('jobStatus', value)}
          />
          <Select
            label="job type"
            options={['all', ...jobTypeItems]}
            value={searchParams.get('jobType') || jobType}
            onOptionChange={(value) => setQuery('jobType', value)}
          />
          <Select
            label="sort"
            options={['newest', 'oldest', 'a-z', 'z-a']}
            value={searchParams.get('sort') || sort}
            onOptionChange={(value) => setQuery('sort', value)}
          />

          <Button
            onClick={() => {
              setSearchParams(searchParamsDefaultValues);
            }}
          >
            Reset Search Values
          </Button>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default SearchContainer;
