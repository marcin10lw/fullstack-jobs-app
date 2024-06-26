import NotFoundImage from './svg/NotFoundImage';

type NotFoundProps = {
  children?: React.ReactNode;
  text: string;
};

const NotFound = ({ text, children }: NotFoundProps) => {
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-center text-xl normal-case">{text}</h2>
      {children}
      <div className="m-[3rem_auto_0] block w-[70%] max-w-[700px]">
        <NotFoundImage />
      </div>
    </section>
  );
};
export default NotFound;
