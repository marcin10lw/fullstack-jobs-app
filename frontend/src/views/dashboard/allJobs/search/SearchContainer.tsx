import { useSearchParams } from 'react-router-dom';

import ContentWrapper from 'src/components/ContentWrapper';
import Select from 'src/components/Select';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { queryParams } from 'src/hooks/useQueryParameter';
import { jobStatusItems, jobTypeItems } from 'src/schema/Job';
import { searchParamsDefaultValues } from './constants';
import { buildSelectOptions } from 'src/lib/helpers/buildSelectOptions';

const SearchContainer = () => {
  const [searchParams] = useSearchParams(searchParamsDefaultValues);
  const { search } = searchParamsDefaultValues;

  const { setQuery } = queryParams.useSetQueryParameter();
  const { deleteQueryParameters } = queryParams.useDeleteQueryParameters();

  const clearQueryParameters = () => {
    deleteQueryParameters(Object.keys(searchParamsDefaultValues));
  };

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
            options={buildSelectOptions(['all', ...jobStatusItems])}
            value={searchParams.get('jobStatus') || undefined}
            onOptionChange={(value) => setQuery('jobStatus', value)}
          />
          <Select
            label="job type"
            options={buildSelectOptions(['all', ...jobTypeItems])}
            value={searchParams.get('jobType') || undefined}
            onOptionChange={(value) => setQuery('jobType', value)}
          />
          <Select
            label="sort"
            options={buildSelectOptions(['newest', 'oldest', 'a-z', 'z-a'])}
            value={searchParams.get('sort') || undefined}
            onOptionChange={(value) => setQuery('sort', value)}
          />

          <Button onClick={clearQueryParameters}>Reset Search Values</Button>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default SearchContainer;
