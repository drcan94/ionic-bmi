import React, { SyntheticEvent } from "react";
import {
  IonLabel,
  IonSegment,
  IonSegmentButton,
  SegmentChangeEventDetail,
} from "@ionic/react";

const segments = [
  { value: "mkg", label: "m/kg" },
  { value: "ftlbs", label: "ft/lbs" },
];

type SegmentProps = {
  // segments: Array<Segment>; // segmenti parent'dan alsaydık bu type ile alabilirdik ancak
  active: "mkg" | "ftlbs";
  whenChange: (event: CustomEvent<SegmentChangeEventDetail>) => void;
  whenChangeLabel: (event: any) => void;
};

const SegmentTab: React.FC<SegmentProps> = ({
  active,
  whenChange,
  whenChangeLabel,
}) => {
  return (
    <IonSegment
      onIonChange={whenChange}
      className="ion-justify-content-center"
      scrollable
      value={active}
    >
      {segments.map((object, index) => {
        return (
          <IonSegmentButton
            onClick={whenChangeLabel}
            key={index}
            value={object.value}
            aria-label={object.label}
          >
            <IonLabel className="ion-text-lowercase">{object.label}</IonLabel>
          </IonSegmentButton>
        );
      })}
    </IonSegment>
  );
};

export default SegmentTab;
