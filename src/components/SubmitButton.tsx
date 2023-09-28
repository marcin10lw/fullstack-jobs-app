type SubmitButtonProps = {
  isLoading: boolean;
  isFormBtn?: boolean;
};

const SubmitButton = ({ isLoading, isFormBtn }: SubmitButtonProps) => {
  return (
    <button
      disabled={isLoading}
      type="submit"
      className={`btn btn-block ${isFormBtn && "form-btn"}`}
    >
      {isLoading ? "Submitting" : "Submit"}
    </button>
  );
};

export default SubmitButton;
