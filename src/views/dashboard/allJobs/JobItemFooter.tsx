import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { buttonVariants } from 'src/components/ui/button';
import { useToast } from 'src/components/ui/use-toast';
import errorMessage from 'src/helpers/errorMessage';
import { jobAPI } from 'src/infrasctucture/job/jobApiAdapter';
import { ROUTES } from 'src/routes';
import { CustomAxiosError } from 'src/types';
import { ALL_JOBS_QUERY_KEY } from 'src/infrasctucture/job/constants';

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
      <Link
        to={ROUTES.editJob.replace(':jobId', jobId)}
        className={buttonVariants({
          className: 'mr-2 flex h-[30px] items-center text-sm',
        })}
      >
        Edit
      </Link>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          deleteJob(jobId);
        }}
      >
        <button
          disabled={isDeletingJob}
          className={buttonVariants({
            className: 'mr-2 flex h-[30px] items-center text-sm',
            variant: 'destructive',
          })}
        >
          {isDeletingJob ? <Loader2 className="animate-spin" /> : 'Delete'}
        </button>
      </form>
    </footer>
  );
};

export default JobItemFooter;
