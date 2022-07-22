import * as React from "react";
import withStyles from "react-jss";
import TsxTemplateView from "./TsxTemplate.view";
import useModel from "./TsxTemplate.model";
import useStyles from "./TsxTemplate.styles";
import { PropTypes } from "./TsxTemplate.types";

const TsxTemplate: React.FC<PropTypes> = (props) => {
  const { theme, classes } = props;
  const model = useModel({ props })

  return <TsxTemplateView model={model} classes={classes} />;
};

export default withStyles(useStyles)(TsxTemplate);
