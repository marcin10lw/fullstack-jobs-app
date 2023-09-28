type SubmitButtonProps = {
  isLoading: boolean;
};

const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
  return (
    <button
      disabled={isLoading}
      type="submit"
      className="btn btn-block form-btn"
    >
      {isLoading ? "Submitting" : "Submit"}
    </button>
  );
};

export default SubmitButton;
