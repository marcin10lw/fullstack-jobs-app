import { Link, SetURLSearchParams } from "react-router-dom";

import { jobStatusItems, jobTypeItems } from "src/models/Job";
import { Wrapper } from "src/assets/wrappers/DashboardFormPage";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { SearchOnChange, SearchParamsObject } from "src/types";

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

    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  return (
    <Wrapper>
      <form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            labelText="search"
            name="search"
            onInputChange={onInputChange}
            value={searchParams.get("search") || search}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            options={["all", ...jobStatusItems]}
            value={searchParams.get("jobStatus") || jobStatus}
            onInputChange={onInputChange}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            options={["all", ...jobTypeItems]}
            value={searchParams.get("jobType") || jobType}
            onInputChange={onInputChange}
          />
          <FormRowSelect
            labelText="sort"
            name="sort"
            options={["newest", "oldest", "a-z", "z-a"]}
            value={searchParams.get("sort") || sort}
            onInputChange={onInputChange}
          />
          <Link
            to="/dashboard/all-jobs"
            type="button"
            onClick={() => {
              setSearchParams(searchParamsDefaultValues);
            }}
            className="btn form-btn delete-btn"
          >
            Reset Search Values
          </Link>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
