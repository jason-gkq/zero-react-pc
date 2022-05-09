import React, { useState, useLayoutEffect } from "react";
import { Router } from "react-router-dom";

type ICustomRouter = {
  basename?: any;
  children?: any;
  history: any;
};

const CustomRouter: React.FC<ICustomRouter> = ({
  basename,
  children,
  history,
}: ICustomRouter) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });
  useLayoutEffect(() => {
    history.listen(setState);
  }, []);

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

export default CustomRouter;
