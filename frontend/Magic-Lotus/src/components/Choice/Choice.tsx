import "./choice.scss";
import { useEffect, useState } from "react";
import { isObjectInListNonInclude } from "../../helpers/ListValidations";

interface IData {
  id: string;
  name: string;
  img?: string;
}

type Props = {
  data: IData[];
  // DEFAULT BEHAVIOR IS THAT ONLY ONE RADIO IS ACTIVE AT A TIME.
  // IF YOU WANT TO BE ABLE TO SELECT MULTIPLE RADIOS, PASS THE
  // PROP multiChoice.
  onChange: (choices: IData[]) => void;

  // VARIANT
  variant: "checkbox" | "radio";

  // OPTIONAL
  startValue?: IData[];
  multiChoice?: boolean;
  label?: string;
  isValidState?: boolean;
  validationMsg?: string;
};

let initLoad = true;
const Choice = (props: Props) => {
  const [activeChoices, setActiveChoices] = useState<IData[]>(
    props.startValue ? props.startValue : []
  );
  const handleChange = (choice: IData) => {
    if (props.variant === "radio") {
      setActiveChoices([choice]);
    } else {
      const included = isObjectInListNonInclude(choice, activeChoices);
      if (included) {
        setActiveChoices(activeChoices.filter((l) => l.id !== choice.id));
      } else setActiveChoices([...activeChoices, choice]);
    }
  };

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
      {props.data.map((radio: IData, index) => {
        const checked = isObjectInListNonInclude(radio, activeChoices);
        const id = `${radio.id}-${index}`;
        return (
          <div
            key={id}
            className={`choice${checked ? " checked" : ""} ${props.variant}`}
            onClick={() => {
              handleChange(radio);
            }}
          >
            <label htmlFor={id}>
              {radio.img && (
                <div className="image">
                  <img src={radio.img} />
                </div>
              )}
              {radio.name}
            </label>

            <input
              key={id}
              id={id}
              type={props.variant}
              value={radio.name}
              data-testid="choice-input"
              checked={checked}
              onChange={(e) => {
                e.preventDefault();
              }}
            />
          </div>
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

export default Choice;
