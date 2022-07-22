import React, { useState } from "react";
import { initialState } from "./TsxTemplate.constants";
import { ModelPropTypes } from "./TsxTemplate.types";

const useModel = (parentProps: ModelPropTypes) => {
  const { props } = parentProps;

  const [state, setState] = useState<typeof initialState>(initialState);
  const { } = state;
  
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


export default useModel;
