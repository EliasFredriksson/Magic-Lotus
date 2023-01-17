import "./input.scss";
import React from "react";
import FontSize from "../../models/frontend/types/FontSize";

type IProps = PropsInput | PropsTextArea;
type PropsInput = React.InputHTMLAttributes<HTMLInputElement> & {
  type: // BIT OF AN UGLY SOLUTION BUT IT REMOVES THE * WITH (string & {})
  | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
} & PropShared;
type PropsTextArea = React.HTMLAttributes<HTMLTextAreaElement> & {
  // UNIQUE TYPE
  type: "textarea";
  onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & PropShared;

type PropShared = {
  // CLASSNAME
  className?: string;
  // PLACEHOLDER
  placeholder: string;
  // NAME
  name?: string;
  // AFTER / BEFORE DEC
  beforeDec?: React.ReactElement | string;
  afterDec?: React.ReactElement | string;
  // TAB INDEX
  tabIndex?: number;
  // IF type="date", DEFINE MIN / MAX
  min?: string;
  max?: string;
  // DISABLED
  disabled?: boolean;
  // VALID STATE
  isValid?: boolean;
  validationMsg?: string;
  // LABELS
  label?: string;
  id?: string;
  // INPUT STATE
  value?: string;

  // FONT SIZE
  fontSize?: FontSize; // Defaults to 'm'
};

const Input = (props: IProps) => {
  return (
    <div
      className={`input-component${
        props.isValid === undefined || props.isValid ? "" : " invalid"
      } ${props.disabled ? " disabled" : ""}${
        props.className ? ` ${props.className}` : ""
      }${props.fontSize ? ` ${props.fontSize}` : " l"}`}
    >
      {props.label && (
        <label className={`input-label`} htmlFor={props.id}>
          {props.id
            ? props.label
            : "You need to provide an 'id' prop for label!"}
        </label>
      )}
      <div
        className={`inner-wrapper${
          props.fontSize ? ` ${props.fontSize}` : " m"
        }`}
      >
        {props.beforeDec && <div className="before">{props.beforeDec}</div>}
        {props.type === "textarea" ? (
          <textarea
            className="input-textarea"
            tabIndex={props.tabIndex ? props.tabIndex : undefined}
            id={props.id}
            name={props.name ? props.name : ""}
            placeholder={props.placeholder}
            value={props.value}
            disabled={props.disabled ? props.disabled : false}
            onChange={(e) => {
              e.preventDefault();
              props.onChange(e);
            }}
          />
        ) : (
          <input
            className="input-regular"
            tabIndex={props.tabIndex ? props.tabIndex : undefined}
            id={props.id}
            name={props.name ? props.name : ""}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            disabled={props.disabled ? props.disabled : false}
            min={props.min}
            onChange={(e) => {
              e.preventDefault();
              props.onChange(e);
            }}
          />
        )}
        {props.afterDec && <div className="after">{props.afterDec}</div>}
      </div>

      <span
        className={`validation-msg ${props.isValid ? "hide" : "show"}`}
        style={{
          opacity: props.isValid ? 0 : 1,
        }}
      >
        {props.validationMsg}
      </span>
    </div>
  );
};

export default Input;
