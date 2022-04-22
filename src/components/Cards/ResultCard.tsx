import React from "react";
import Card from "./index";
import { CardProps } from './index'

const ResultCard: React.FC<CardProps> = ({ header, content, ...props }) => {
  return <Card header={header} content={content} {...props} />;
};

export default ResultCard;
