import React from "react";
import { IonCard, IonCardHeader, IonCardContent } from "@ionic/react";

export type CardProps = {
  header: string;
  content: number;
};

const Card: React.FC<CardProps> = ({ header, content, ...props }) => {
  return (
    <IonCard class="ion-no-margin ion-text-center" {...props}>
      <IonCardHeader>{header}</IonCardHeader>
      <IonCardContent>
        <h1>{content.toFixed(2)}</h1>
      </IonCardContent>
    </IonCard>
  );
};

export default Card;
