import notFoundImage from "src/assets/images/not-found.svg";
import styled from "styled-components";

const Wrapper = styled.section`
  h2 {
    text-transform: none;
    text-align: center;
  }

  img {
    display: block;
    width: 70%;
    max-width: 700px;
    margin: 4rem auto 0;
  }
`;

type NotFoundProps = {
  text: string;
};

const NotFound = ({ text }: NotFoundProps) => {
  return (
    <Wrapper>
      <h2>{text}</h2>
      <img src={notFoundImage} alt={text} />
    </Wrapper>
  );
};
export default NotFound;
