import { Link, useSearchParams } from "react-router-dom";

import { jobStatusItems, jobTypeItems } from "src/models/Job";
import { Wrapper } from "src/assets/wrappers/DashboardFormPage";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import SubmitButton from "./SubmitButton";
import { SearchOnChange } from "src/types";

const SearchContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            options={["all", ...jobStatusItems]}
            defaultValue="all"
            onInputChange={onInputChange}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            options={["all", ...jobTypeItems]}
            defaultValue="all"
            onInputChange={onInputChange}
          />
          <FormRowSelect
            labelText="sort"
            name="sort"
            options={["newest", "oldest", "a-z", "z-a"]}
            defaultValue="newest"
            onInputChange={onInputChange}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
          <SubmitButton isLoading={false} isFormBtn />
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
