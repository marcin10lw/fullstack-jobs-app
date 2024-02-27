interface JobDescriptionProps {
  descriptionTerm: string;
  descriptionDetail: string;
}

const JobDescription = ({
  descriptionTerm,
  descriptionDetail,
}: JobDescriptionProps) => {
  return (
    <div className="flex items-center gap-2">
      <dt className="font-semibold">{descriptionTerm}</dt>
      <dd className="capitalize">{descriptionDetail}</dd>
    </div>
  );
};

export default JobDescription;
