import React from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";
import styled from "styled-components";

type InputProps = {
  referance: React.Ref<HTMLIonInputElement>;
  label: string;
};

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LabelName = styled.div`
  align-self: center;
`;
const LabelUnit = styled.div`
  align-self: flex-start;
  font-size: 0.6rem;
  font-weight: 100;
  margin-left: 6px;
  letter-spacing: 1.5px;
`;

const Input: React.FC<InputProps> = ({ referance, label, ...props }) => {
  const newLabel = label.split(" ");
  const labelUnit = newLabel[1];
  const labelName = newLabel[0];
  return (
    <IonItem {...props}>
      <IonLabel position="floating">
        <LabelContainer>
          <LabelName>{labelName}</LabelName>
          <LabelUnit>({labelUnit})</LabelUnit>
        </LabelContainer>
      </IonLabel>
      <IonInput
        type="number"
        ref={referance}
        onKeyDown={(event) => {
          return ["e", "E"].includes(event.key) && event.preventDefault();
        }}
        onPaste={(e) => {
          let clipboardData, pastedData;
          clipboardData = e.clipboardData;
          console.log(clipboardData);
          pastedData = clipboardData.getData("Text");
          if (pastedData.includes("e") || pastedData.includes("E")) {
            return e.preventDefault();
          }
        }}
      ></IonInput>
    </IonItem>
  );
};

export default Input;
