import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Textarea } from 'src/components/ui/textarea';
import { useToast } from 'src/components/ui/use-toast';
import { JOB_BY_ID_QUERY_KEY } from 'src/infrasctucture/job/constants';
import { jobAPI } from 'src/infrasctucture/job/jobApiAdapter';

interface JobDescriptionProps {
  jobDescription: string;
  jobId: string;
}

const JobDescription = ({ jobId, jobDescription }: JobDescriptionProps) => {
  const [newJobDescription, setNewJobDescription] = useState(jobDescription);

  const qc = useQueryClient();
  const { toast } = useToast();

  const { mutate: updateJobDescription, isLoading: isUpdating } = useMutation({
    mutationFn: jobAPI.updateJobDescription,
    onSuccess: () => {
      toast({
        title: 'Job description updated',
        variant: 'success',
      });
      qc.invalidateQueries([JOB_BY_ID_QUERY_KEY]);
    },
    onError: () => {
      toast({
        title: 'Could not update job description',
        variant: 'destructive',
      });
    },
  });

  const onUpdate = () => {
    if (jobDescription === newJobDescription) return;
    updateJobDescription({ jobId, jobDescription: newJobDescription });
  };

  return (
    <div className="flex flex-col">
      <Textarea
        value={newJobDescription}
        onChange={({ target }) => setNewJobDescription(target.value)}
        placeholder="Job description"
        className="min-h-28"
      />
      <Button
        onClick={onUpdate}
        disabled={isUpdating || jobDescription === newJobDescription}
        size="sm"
        className="mt-2 w-[54px] self-end"
      >
        {isUpdating ? <Loader2 className="size-6 animate-spin" /> : 'Save'}
      </Button>
    </div>
  );
};

export default JobDescription;
