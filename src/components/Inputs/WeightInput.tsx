import React from "react";
import Input from "./index";

type WeightProps = {
  referance: React.Ref<HTMLIonInputElement>;
  weightUnit: string
};

const WeightInput: React.FC<WeightProps> = ({ referance, weightUnit, ...props }) => {
  return <Input referance={referance} label={`Weight ${weightUnit}`} {...props} />;
};

export default WeightInput;
