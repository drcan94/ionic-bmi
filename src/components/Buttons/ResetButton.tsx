import React from "react";

import Button from "./index";
import { refreshOutline } from "ionicons/icons";

type ResetProps = {
  action: () => void;
};

const ResetButton: React.FC<ResetProps> = ({ action, ...props }) => {
  return (
    <Button icon={refreshOutline} action={action} {...props}>
      Reset
    </Button>
  );
};

export default ResetButton;
