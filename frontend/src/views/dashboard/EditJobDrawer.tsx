import { Button } from 'src/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from 'src/components/ui/drawer';
import EditJobDrawerContent from './allJobs/allJobsList/jobItem/EditJobDrawerContent';
import { useState } from 'react';
import { ScrollArea } from 'src/components/ui/scroll-area';

interface EditJobDrawerProps {
  jobId: string;
}

const EditJobDrawer = ({ jobId }: EditJobDrawerProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={(isOpen) => setIsDrawerOpen(isOpen)}
    >
      <DrawerTrigger asChild>
        <Button className="mr-2 flex h-[30px] items-center text-sm">
          Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[100vh] min-h-[40vh]">
        <ScrollArea className="mt-10 px-5 lg:px-10">
          <div className="pb-8 lg:pb-16">
            <EditJobDrawerContent jobId={jobId} closeDrawer={closeDrawer} />
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default EditJobDrawer;
