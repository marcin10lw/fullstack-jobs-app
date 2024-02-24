import { Button } from 'src/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from 'src/components/ui/drawer';
import EditJobDrawerContent from './EditJobDrawerContent';

interface EditJobDrawerProps {
  jobId: string;
}

const EditJobDrawer = ({ jobId }: EditJobDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="mr-2 flex h-[30px] items-center text-sm">
          Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent className="min-h-[40vh] p-5 pb-8 lg:p-10 lg:pb-16">
        <div className="mt-10">
          <EditJobDrawerContent jobId={jobId} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EditJobDrawer;
