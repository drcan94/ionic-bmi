import React from "react";
import { IonButton, IonIcon } from "@ionic/react";

type ButtonProps = {
  icon: string;
  action: () => void;
};

const Button: React.FC<ButtonProps> = ({ icon, action, children, ...props }) => {
  return (
    <IonButton onClick={action} {...props}>
      <IonIcon icon={icon} slot="start" />
      {children}
    </IonButton>
  );
};

export default Button;
