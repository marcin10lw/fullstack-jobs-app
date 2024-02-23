import { Link, SetURLSearchParams } from 'react-router-dom';

import { jobStatusItems, jobTypeItems } from 'src/models/Job';
import FormRow from '../../../components/FormRow';
import FormRowSelect from '../../../components/FormRowSelect';
import { SearchOnChange, SearchParamsObject } from 'src/types';

type SearchContainerProps = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  searchParamsDefaultValues: SearchParamsObject;
};

const SearchContainer = ({
  searchParams,
  searchParamsDefaultValues,
  setSearchParams,
}: SearchContainerProps) => {
  const { jobStatus, jobType, search, sort } = searchParamsDefaultValues;

  const onInputChange = (event: SearchOnChange) => {
    const { name, value } = event.target;

    searchParams.set('page', '1');
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full rounded-[--border-radius] bg-[--background-secondary-color] p-[3rem_2rem_4rem]">
      <form className="form m-0 w-full max-w-full rounded-none p-0 shadow-none">
        <h5 className="mb-8">search form</h5>
        <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:items-center lg:gap-[2rem_1rem] xl:grid-cols-3">
          <FormRow
            type="search"
            labelText="search"
            name="search"
            onInputChange={onInputChange}
            value={searchParams.get('search') || search}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            options={['all', ...jobStatusItems]}
            value={searchParams.get('jobStatus') || jobStatus}
            onInputChange={onInputChange}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            options={['all', ...jobTypeItems]}
            value={searchParams.get('jobType') || jobType}
            onInputChange={onInputChange}
          />
          <FormRowSelect
            labelText="sort"
            name="sort"
            options={['newest', 'oldest', 'a-z', 'z-a']}
            value={searchParams.get('sort') || sort}
            onInputChange={onInputChange}
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
    </div>
  );
};

export default SearchContainer;
