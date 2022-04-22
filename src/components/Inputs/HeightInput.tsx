import React from "react";
import Input from "./index";

type HeightProps = {
  referance: React.Ref<HTMLIonInputElement>;
  heightUnit: string;
};

const HeightInput: React.FC<HeightProps> = ({
  referance,
  heightUnit,
  ...props
}) => {
  return (
    <Input referance={referance} label={`Height ${heightUnit}`} {...props} />
  );
};

export default HeightInput;
