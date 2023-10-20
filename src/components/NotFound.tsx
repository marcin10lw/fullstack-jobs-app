import notFoundImage from 'src/assets/images/not-found.svg';

type NotFoundProps = {
  text: string;
};

const NotFound = ({ text }: NotFoundProps) => {
  return (
    <section>
      <h2 className="text-center normal-case">{text}</h2>
      <img
        className="m-[4rem_auto_0] block w-[70%] max-w-[700px]"
        src={notFoundImage}
        alt={text}
      />
    </section>
  );
};
export default NotFound;
