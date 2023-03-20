import { Spinner } from "reactstrap";

export const Loading = (props) => {
  const { util, message } = props;

  return (
    <div>
      <p className="sw-font">{message}...</p>
      <Spinner color={util} size="" type="grow">
        Loading...
      </Spinner>
      <Spinner color={util} size="" type="grow">
        Loading...
      </Spinner>
      <Spinner color={util} size="" type="grow">
        Loading...
      </Spinner>
    </div>
  );
};
