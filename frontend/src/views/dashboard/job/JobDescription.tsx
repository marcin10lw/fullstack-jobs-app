import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Textarea } from 'src/components/ui/textarea';
import { useToast } from 'src/components/ui/use-toast';
import { JOB_BY_ID_QUERY_KEY } from 'src/api/job/constants';
import { jobAPI } from 'src/api/job/jobApiAdapter';
import { cn } from 'src/lib/utils';

interface JobDescriptionProps {
  jobDescription: string;
  jobId: string;
}

const JobDescription = ({ jobId, jobDescription }: JobDescriptionProps) => {
  const [newJobDescription, setNewJobDescription] = useState(jobDescription);
  const maxJobDescriptionLength = 1000;

  const qc = useQueryClient();
  const { toast } = useToast();

  const { mutate: updateJobDescription, isLoading: isUpdatingJobDescription } = useMutation({
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
      <div className="relative">
        <Textarea
          value={newJobDescription}
          onChange={({ target }) => setNewJobDescription(target.value)}
          placeholder="Job description"
          className="min-h-28 leading-relaxed"
        />

        <div className="absolute right-0 top-[calc(100%-4px)]">
          <span
            className={cn('text-xs font-semibold', {
              'text-destructive': newJobDescription.length > maxJobDescriptionLength,
              'text-muted-foreground': newJobDescription.length <= maxJobDescriptionLength,
            })}
          >
            {newJobDescription.length}/{maxJobDescriptionLength}
          </span>
        </div>
      </div>
      <Button
        onClick={onUpdate}
        disabled={isUpdatingJobDescription || jobDescription === newJobDescription}
        isLoading={isUpdatingJobDescription}
        spinnerClassName="size-6"
        size="sm"
        className="mt-6 w-[54px] self-end"
      >
        Save
      </Button>
    </div>
  );
};

export default JobDescription;
