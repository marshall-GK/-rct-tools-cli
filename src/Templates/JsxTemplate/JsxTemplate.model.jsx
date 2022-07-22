import React, { useState } from "react";
import PropTypes from "prop-types";
import { initialState } from "./Person.contants";

const useModel = (props) => {
  const {} = props;
  const [state, setState] = useState(initialState);
  const {} = state;

  // setState({
  //   ...state,
  //   <key>: <value>,
  // });

  // React.useEffect(() => {
  // ... logic ...
  // }, [<key>])

  // const foo = () => {
  //
  // }

  return {
    // foo
  };
};

useModel.propTypes = {};

useModel.defaultProps = {};

export default useModel;
