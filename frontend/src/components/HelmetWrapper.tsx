import { Helmet } from 'react-helmet-async';
import { metadata } from 'src/common/metadata';

type HelmetWrapperProps = {
  children: React.ReactNode;
  page: keyof typeof metadata;
};

const HelmetWrapper = ({ children, page }: HelmetWrapperProps) => {
  return (
    <>
      <Helmet>
        <title>{metadata[page].title}</title>
        <meta name="description" content={metadata[page].description} />
      </Helmet>
      {children}
    </>
  );
};

export default HelmetWrapper;
