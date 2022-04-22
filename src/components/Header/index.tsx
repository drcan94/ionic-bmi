import React from "react";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";

const Header: React.FC<{ label: string }> = ({ label }) => {
  return (
    <IonHeader>
      <IonToolbar color="tertiary">
        <IonTitle>{label}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
