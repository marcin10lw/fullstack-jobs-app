import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button, buttonVariants } from 'src/components/ui/button';
import { useToast } from 'src/components/ui/use-toast';
import { ALL_JOBS_QUERY_KEY } from 'src/api/job/constants';
import { jobAPI } from 'src/api/job/jobApiAdapter';
import errorMessage from 'src/lib/helpers/errorMessage';
import { CustomAxiosError } from 'src/types';
import EditJobDrawer from '../../../EditJobDrawer';

interface JobItemFooterProps {
  jobId: string;
}

const JobItemFooter = ({ jobId }: JobItemFooterProps) => {
  const qc = useQueryClient();

  const { toast } = useToast();

  const { isLoading: isDeletingJob, mutate: deleteJob } = useMutation({
    mutationFn: jobAPI.deleteJob,
    onSuccess: async () => {
      await qc.invalidateQueries([ALL_JOBS_QUERY_KEY]);
    },
    onError: (error: CustomAxiosError) => {
      toast({
        title: 'Could not delete job',
        description: errorMessage(error, ''),
        variant: 'destructive',
      });
    },
  });

  return (
    <footer className="mt-4 flex items-center">
      <EditJobDrawer jobId={jobId} />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          deleteJob(jobId);
        }}
      >
        <Button
          disabled={isDeletingJob}
          isLoading={isDeletingJob}
          className={buttonVariants({
            className: 'mr-2 flex h-[30px] items-center text-sm',
            variant: 'destructive',
          })}
        >
          Delete
        </Button>
      </form>
    </footer>
  );
};

export default JobItemFooter;
