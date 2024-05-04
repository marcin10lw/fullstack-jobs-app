import { createRef, useEffect, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import { File as FileIcon } from 'lucide-react';

import 'cropperjs/dist/cropper.css';
import { Button, buttonVariants } from 'src/components/ui/button';
import { Card, CardContent } from 'src/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog';
import { dataUrlToFile } from 'src/lib/helpers/dataUrlToFile';

const AvatarCropper = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const imageErrors: string[] = [];

  if (selectedImage && !selectedImage?.type.startsWith('image/')) {
    imageErrors.push('File must be an image');
  }

  if (selectedImage && selectedImage.size > 524288) {
    imageErrors.push('File max size is 0.5 MB');
  }

  const cropperRef = createRef<ReactCropperElement>();

  const buttonDisabled = !selectedImage || imageErrors.length > 0;

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cropper = cropperRef.current?.cropper;

    if (buttonDisabled || !cropper) return;

    let quality = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const canvasDataURL = cropper.getCroppedCanvas().toDataURL('image/jpeg', quality);
      const file = await dataUrlToFile(canvasDataURL, selectedImage.name, 'image/jpeg');

      if (file.size <= selectedImage.size) {
        const formData = new FormData();
        formData.append('avatar', file);

        console.log('FILE', selectedImage);
        console.log('NEW FILE', file);
        break;
      }

      quality -= 0.01;
    }
  };

  const imageSrc = selectedImage ? URL.createObjectURL(selectedImage) : undefined;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!dialogOpen) {
      timeout = setTimeout(() => {
        setSelectedImage(null);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [dialogOpen]);

  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button className="z-10 inline-block cursor-pointer text-white" variant="link">
          Upload photo
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-40px)] max-w-[500px] md:w-full">
        <DialogHeader>
          <DialogTitle>Change avatar</DialogTitle>
          <DialogDescription>Select and edit you new profile picture</DialogDescription>
        </DialogHeader>

        <form onSubmit={onFormSubmit} className="flex flex-col gap-4" noValidate encType="multipart/form-data">
          <label htmlFor="avatar" className={buttonVariants({ variant: 'default', className: 'cursor-pointer' })}>
            Choose image
          </label>

          <input
            onChange={({ target }) => {
              if (target.files) {
                setSelectedImage(target.files[0]);
              }
            }}
            className="hidden"
            type="file"
            id="avatar"
            accept="image/*"
          />
          {selectedImage ? (
            <div className="relative">
              <Cropper
                ref={cropperRef}
                viewMode={1}
                src={imageSrc}
                zoomTo={0}
                preview=".img-preview"
                aspectRatio={1}
                minCropBoxHeight={100}
                minCropBoxWidth={100}
                responsive={true}
                autoCropArea={1}
                guides={true}
                checkOrientation={false}
              />
              {imageErrors.length > 0 &&
                imageErrors.map((error) => (
                  <p key={error} className="absolute top-[calc(100%+4px)] text-sm text-destructive">
                    {error}
                  </p>
                ))}
            </div>
          ) : (
            <Card className="group bg-transparent transition-colors duration-300 hover:border-muted-foreground">
              <CardContent className="relative h-[260px]">
                <label htmlFor="avatar" className="absolute inset-0 cursor-pointer">
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    <FileIcon className="size-14" />
                    <p className="text-xl">Click to select image</p>
                  </div>
                </label>
              </CardContent>
            </Card>
          )}

          <Button className="mt-2 self-end" type="submit" disabled={buttonDisabled}>
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarCropper;
