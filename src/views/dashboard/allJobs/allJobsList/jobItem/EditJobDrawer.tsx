import { Button } from 'src/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from 'src/components/ui/drawer';
import EditJobDrawerContent from './EditJobDrawerContent';
import { useState } from 'react';

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
        <div className="mt-10 overflow-y-auto px-5 pb-8 lg:px-10 lg:pb-16">
          <EditJobDrawerContent jobId={jobId} closeDrawer={closeDrawer} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EditJobDrawer;
