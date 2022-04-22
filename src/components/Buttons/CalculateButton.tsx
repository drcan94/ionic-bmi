import React from "react";
import Button from "./index";
import { calculatorOutline } from "ionicons/icons";

type CalculteProps = {
  action: () => void;
};

const CalculateButton: React.FC<CalculteProps> = ({ action, ...props }) => {
  return (
    <Button icon={calculatorOutline} action={action} {...props}>
      Calculate
    </Button>
  );
};

export default CalculateButton;
