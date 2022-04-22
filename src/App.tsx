import React, {
  FormEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import {
  IonApp,
  setupIonicReact,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
  SegmentChangeEventDetail,
} from "@ionic/react";
import CalculateButton from "./components/Buttons/CalculateButton";
import ResetButton from "./components/Buttons/ResetButton";
import HeightInput from "./components/Inputs/HeightInput";
import WeightInput from "./components/Inputs/WeightInput";
import ResultCard from "./components/Cards/ResultCard";
import Header from "./components/Header";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import SegmentTab from "./components/SegmentTab";

setupIonicReact();

const App: React.FC = () => {
  const HeaderTitle: string = "BMI Calculator";
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const [result, setResult] = useState<number>();
  // const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [activeTab, setActiveTab] = useState<"mkg" | "ftlbs">("mkg");
  const [activeLabel, setActiveLabel] = useState<string>("m/kg");
  const [heightUnit, setHeightUnit] = useState<string>("m");
  const [weightUnit, setWeightUnit] = useState<string>("kg");

  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
    setResult(undefined);
    setActiveTab("mkg");
    setActiveLabel("m/kg");
  };

  const calculateBMI = () => {
    const enteredHeight = heightInputRef.current!.value;
    const enteredWeight = weightInputRef.current!.value;
    // ...? (question marl)    --> varsa değerini yoksa null döner
    // ...! (exclamation mark) --> asla null olmayacağından eminsek kullanırız
    // +... (unary operator)   --> for Number() shortcut
    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredHeight <= 0 ||
      +enteredWeight <= 0
    ) {
      setError("Please check your inputs");
      return;
    }

    const currentWeight = (+enteredWeight).toFixed(3)
    const currentHeight = (+enteredHeight).toFixed(3)

    const currentBMI =
      heightUnit === "m"
        ? +currentWeight / (+currentHeight) ** 2
        : (+currentWeight / (+currentHeight * 12) ** 2) * 703;
    setResult(currentBMI);
  };

  const handleChange = (event: CustomEvent) => {
    setActiveTab(event.detail.value);
    let correctedHeight!: any;
    let correctedWeight!: any;

    const enteredHeight = heightInputRef.current!.value;
    if (enteredHeight) {
      const heightConversionFactor = heightUnit === "ft" ? 3.28084 : 0.3048;
      correctedHeight = +enteredHeight / heightConversionFactor;
      heightInputRef.current!.value = correctedHeight.toFixed(3);
    }

    const enteredWeight = weightInputRef.current!.value;
    if (enteredWeight) {
      const weightConversionFactor = weightUnit === "lbs" ? 2.20462 : 0.453592;
      correctedWeight = +enteredWeight / weightConversionFactor;
      weightInputRef.current!.value = correctedWeight.toFixed(3);
    }

    const currentWeight = (+correctedWeight).toFixed(3)
    const currentHeight = (+correctedHeight).toFixed(3)

    if (enteredHeight && enteredWeight) {
      const currentBMI =
        heightUnit === "ft"
          ? +currentWeight / (+currentHeight) ** 2
          : (+currentWeight / (+currentHeight * 12) ** 2) * 703;
      setResult(currentBMI);
    }
  };

  const handleChangeLabel = (event: any) => {
    const label = event.target.getAttribute("aria-label");
    setActiveLabel(label);
  };

  useEffect(() => {
    setHeightUnit(activeLabel.split("/")[0]);
    setWeightUnit(activeLabel.split("/")[1]);
  }, [activeLabel, heightUnit, weightUnit]);

  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!error} // gerçek boolean değerlere döndürür
        onDidDismiss={() => setError("")}
        cssClass="my-custom-class"
        header={"Alert"}
        message={error}
        buttons={["OK"]}
      />
      <IonApp>
        <Header label={HeaderTitle} />
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <SegmentTab
                  whenChange={handleChange}
                  whenChangeLabel={handleChangeLabel}
                  active={activeTab}
                />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <HeightInput
                  heightUnit={heightUnit}
                  referance={heightInputRef}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <WeightInput
                  weightUnit={weightUnit}
                  referance={weightInputRef}
                />
              </IonCol>
            </IonRow>

            <IonRow className="ion-margin-top">
              <IonCol className="ion-text-center ion-text-sm-left">
                <CalculateButton action={calculateBMI} />
              </IonCol>
              <IonCol className="ion-text-center ion-text-sm-right">
                <ResetButton action={resetInputs} />
              </IonCol>
            </IonRow>

            {result && (
              <IonRow>
                <IonCol>
                  <ResultCard
                    header={`Your BMI (${activeLabel})`}
                    content={result}
                  />
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
