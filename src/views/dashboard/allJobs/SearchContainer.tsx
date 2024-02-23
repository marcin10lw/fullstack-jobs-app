import { Link, SetURLSearchParams } from 'react-router-dom';

import ContentWrapper from 'src/components/ContentWrapper';
import Select from 'src/components/Select';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { jobStatusItems, jobTypeItems } from 'src/models/Job';
import { searchParamsDefaultValues } from './constants';

type SearchContainerProps = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

const SearchContainer = ({
  searchParams,
  setSearchParams,
}: SearchContainerProps) => {
  const { jobStatus, jobType, search, sort } = searchParamsDefaultValues;

  return (
    <ContentWrapper title="Search">
      <form>
        <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:items-center lg:gap-[2rem_1rem] xl:grid-cols-3">
          <div className="relative">
            <Label htmlFor="search" className="sr-only">
              search
            </Label>
            <Input id="search" placeholder="Search" />
          </div>

          <Select
            label="job status"
            options={['all', ...jobStatusItems]}
            value={searchParams.get('jobStatus') || jobStatus}
            onOptionChange={() => {}}
          />
          <Select
            label="job type"
            options={['all', ...jobTypeItems]}
            value={searchParams.get('jobType') || jobType}
            onOptionChange={() => {}}
          />
          <Select
            label="sort"
            options={['newest', 'oldest', 'a-z', 'z-a']}
            value={searchParams.get('sort') || sort}
            onOptionChange={() => {}}
          />

          <Link
            to="/dashboard/all-jobs"
            type="button"
            onClick={() => {
              setSearchParams(searchParamsDefaultValues);
            }}
            className="btn form-btn mt-4 flex items-center justify-center xl:mt-8"
          >
            Reset Search Values
          </Link>
        </div>
      </form>
    </ContentWrapper>
  );
};

export default SearchContainer;
