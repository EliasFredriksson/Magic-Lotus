import "./choice.scss";
import { useCallback, useEffect, useState } from "react";
import { isObjectInListNonInclude } from "../../helpers/ListValidations";
import FontSize from "../../models/frontend/types/FontSize";

type ChoiceWithImg = {
  id: string;
  name: string;
  image: string;
  fallbackImage: string;
  meta?: any;
};

type ChoiceBasic = {
  id: string;
  name: string;
  image?: undefined;
  fallbackImage?: undefined;
  meta?: any;
};

export type ChoiceData = ChoiceBasic | ChoiceWithImg;

type Props = {
  data: ChoiceData[];
  // DEFAULT BEHAVIOR IS THAT ONLY ONE RADIO IS ACTIVE AT A TIME.
  // IF YOU WANT TO BE ABLE TO SELECT MULTIPLE RADIOS, PASS THE
  // PROP multiChoice.
  onChange: (choices: ChoiceData[]) => void;

  // VARIANT
  variant: "checkbox" | "radio";

  // OPTIONAL
  startValue?: ChoiceData[];
  label?: string;
  isValidState?: boolean;
  validationMsg?: string;
  fontSize?: FontSize; // Defaults to 'l'

  // FOR TESTING AS data-* ATTRIBUTES ARE NOT AUTOMATICALLY ADDED UNLESS THE PROPS EXTEND A BUILT IN HTML ELEMENT.
  "data-testid"?: string;
};

let initLoad = true;
const Choice = (props: Props) => {
  const [activeChoices, setActiveChoices] = useState<ChoiceData[]>(
    props.startValue ? props.startValue : []
  );
  const handleChange = useCallback(
    (choice: ChoiceData) => {
      if (props.variant === "radio") {
        setActiveChoices([choice]);
      } else {
        const included = isObjectInListNonInclude(choice, activeChoices);
        if (included) {
          setActiveChoices(activeChoices.filter((l) => l.id !== choice.id));
        } else setActiveChoices([...activeChoices, choice]);
      }
    },
    [activeChoices, props.variant]
  );

  useEffect(() => {
    if (initLoad) {
      initLoad = false;
      return;
    }
    props.onChange(activeChoices);
  }, [activeChoices]);

  useEffect(() => {
    if (props.startValue) setActiveChoices(props.startValue);
  }, [props.startValue]);

  return (
    <div
      data-testid={props["data-testid"] ? props["data-testid"] : undefined}
      className={`choice-component${props.variant ? ` ${props.variant}` : ""}${
        props.fontSize ? ` ${props.fontSize}` : " l"
      }`}
    >
      {props.label && (
        <label
          className={`choice-label ${
            props.isValidState === false ? "invalid" : ""
          }`}
        >
          {props.label}
        </label>
      )}
      {props.data.map((choice: ChoiceData, index) => {
        const id = `${choice.id}-${index}`;
        return (
          <ChoiceEntry
            data-testid={choice.name}
            key={id}
            choice={choice}
            checked={isObjectInListNonInclude(choice, activeChoices)}
            id={id}
            variant={props.variant}
            onClick={() => {
              handleChange(choice);
            }}
          />
        );
      })}
      {props.validationMsg && props.validationMsg.length > 0 && (
        <span
          className={`validation-msg ${!props.isValidState ? "show" : "hide"}`}
        >
          {props.validationMsg}
        </span>
      )}
    </div>
  );
};

type PropsEntry = {
  choice: ChoiceData;
  id: string;
  checked: boolean;
  variant: "checkbox" | "radio";
  onClick: () => void;
  "data-testid"?: string;
};
const ChoiceEntry = (props: PropsEntry) => {
  return (
    <div
      data-testid={props["data-testid"] ? props["data-testid"] : undefined}
      key={props.id}
      className={`choice${props.checked ? " checked" : ""} ${props.variant}`}
      onClick={() => {
        props.onClick();
      }}
    >
      <label htmlFor={props.id}>
        {props.choice.image && (
          <div className="image">
            <img src={props.choice.image} alt={props.choice.name} />
          </div>
        )}
        {props.choice.name}
      </label>

      <input
        id={props.id}
        type={props.variant}
        value={props.choice.name}
        checked={props.checked}
        onChange={(e) => {
          e.preventDefault();
        }}
      />
    </div>
  );
};

export default Choice;
