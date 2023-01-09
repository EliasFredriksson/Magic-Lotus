import "./choice.scss";
import { useCallback, useEffect, useState } from "react";
import { isObjectInListNonInclude } from "../../helpers/ListValidations";

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

type Choice = ChoiceBasic | ChoiceWithImg;

type Props = {
  data: Choice[];
  // DEFAULT BEHAVIOR IS THAT ONLY ONE RADIO IS ACTIVE AT A TIME.
  // IF YOU WANT TO BE ABLE TO SELECT MULTIPLE RADIOS, PASS THE
  // PROP multiChoice.
  onChange: (choices: Choice[]) => void;

  // VARIANT
  variant: "checkbox" | "radio";

  // OPTIONAL
  startValue?: Choice[];
  label?: string;
  isValidState?: boolean;
  validationMsg?: string;
};

let initLoad = true;
const Choice = (props: Props) => {
  const [activeChoices, setActiveChoices] = useState<Choice[]>(
    props.startValue ? props.startValue : []
  );
  const handleChange = useCallback(
    (choice: Choice) => {
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
    return () => {};
  }, [activeChoices]);

  return (
    <div
      className={`choice-component${props.variant ? ` ${props.variant}` : ""}`}
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
      {props.data.map((choice: Choice, index) => {
        const id = `${choice.id}-${index}`;
        return (
          <ChoiceEntry
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
  choice: Choice;
  id: string;
  checked: boolean;
  variant: "checkbox" | "radio";
  onClick: () => void;
};
const ChoiceEntry = (props: PropsEntry) => {
  return (
    <div
      key={props.id}
      className={`choice${props.checked ? " checked" : ""} ${props.variant}`}
      onClick={() => {
        props.onClick();
      }}
    >
      <label htmlFor={props.id}>
        {props.choice.image && (
          <div className="image">
            <img src={props.choice.image} />
          </div>
        )}
        {props.choice.name}
      </label>

      <input
        id={props.id}
        type={props.variant}
        value={props.choice.name}
        data-testid="choice-input"
        checked={props.checked}
        onChange={(e) => {
          e.preventDefault();
        }}
      />
    </div>
  );
};

export default Choice;
