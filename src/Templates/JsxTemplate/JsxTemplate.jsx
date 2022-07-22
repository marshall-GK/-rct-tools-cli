import * as React from "react";
import PropTypes from 'prop-types';
import JsxTemplateView from "./JsxTemplate.view";
import useModel from "./JsxTemplate.model";
import useStyles from "./JsxTemplate.style";

const JsxTemplate = (props) => {
  const {} = props;
  const model = useModel(props);
  const classes = useStyles();

  return <JsxTemplateView model={model} classes={classes} />;
};

export default JsxTemplate;
