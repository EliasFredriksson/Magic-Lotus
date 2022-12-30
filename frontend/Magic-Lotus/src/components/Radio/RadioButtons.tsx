import "./radioButtons.scss";
import IData from "../../../models_NEW_STRUCTURE/general/IData";
import { useEffect, useState } from "react";
import { isObjectInListNonInclude } from "../../../helpers/ListValidations";

type Props = {
  radios: IData[];
  // DEFAULT BEHAVIOR IS THAT ONLY ONE RADIO IS ACTIVE AT A TIME.
  // IF YOU WANT TO BE ABLE TO SELECT MULTIPLE RADIOS, PASS THE
  // PROP allowMultipleChoice.
  onRadiosChange: (radios: IData[]) => void;

  // OPTIONAL
  startValue?: IData[];
  allowMultipleChoice?: boolean;
  label?: string;
  isValidState?: boolean;
  validationMsg?: string;
};

let initLoad = true;
const RadioButtons = (props: Props) => {
  const [activeRadios, setActiveRadios] = useState<IData[]>(
    props.startValue ? props.startValue : []
  );
  const handleChange = (radio: IData) => {
    if (!props.allowMultipleChoice) {
      setActiveRadios([radio]);
    } else {
      const included = isObjectInListNonInclude(radio, activeRadios);
      if (included) {
        setActiveRadios(activeRadios.filter((l) => l.id !== radio.id));
      } else setActiveRadios([...activeRadios, radio]);
    }
  };

  useEffect(() => {
    if (initLoad) {
      initLoad = false;
      return;
    }
    props.onRadiosChange(activeRadios);
    return () => {};
  }, [activeRadios]);

  return (
    <div className="radio-buttons-component">
      {props.label && (
        <label
          className={`radios-label ${!props.isValidState ? "invalid" : ""}`}
        >
          {props.label}
        </label>
      )}
      <div className="inner-radios-wrapper">
        {props.radios.map((radio: IData, index) => {
          const checked = isObjectInListNonInclude(radio, activeRadios);
          return (
            <button
              key={`${radio.id}-${index}`}
              type="button"
              value={radio.name}
              className={`radio-button  ${checked ? "checked" : ""}`}
              onClick={() => handleChange(radio)}
              data-testid="radio-button "
            >
              {radio.name}
            </button>
          );
        })}
      </div>
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

export default RadioButtons;
