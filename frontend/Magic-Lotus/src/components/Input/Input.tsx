import "./input.scss";
import React from "react";

type IProps = PropsInput | PropsTextArea;
type PropsInput = React.InputHTMLAttributes<HTMLInputElement> & {
  // INPUT TAG
  className?: string;
  placeholder: string;
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
  name?: string;
  // LABELS
  label?: string;
  id?: string;
  // INPUT STATE
  value?: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  // VALID STATE
  isValid?: boolean;
  validationMsg?: string;
  // TAB INDEX
  tabIndex?: number;
  // IF type="date", DEFINE MIN / MAX
  min?: string;
  max?: string;
  // DISABLED
  disabled?: boolean;

  // AFTER / BEFORE DEC
  beforeDec?: React.ReactElement | string;
  afterDec?: React.ReactElement | string;
};
type PropsTextArea = React.HTMLAttributes<HTMLTextAreaElement> & {
  // INPUT TAG
  className?: string;
  placeholder: string;
  type: "textarea";
  name?: string;
  // LABELS
  label?: string;
  id?: string;
  // INPUT STATE
  value: string;
  onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
  // VALID STATE
  isValid?: boolean;
  validationMsg?: string;
  // TAB INDEX
  tabIndex?: number;
  // IF type="date", DEFINE MIN / MAX
  min?: string;
  max?: string;
  // DISABLED
  disabled?: boolean;

  // AFTER / BEFORE DEC
  beforeDec?: React.ReactElement | string;
  afterDec?: React.ReactElement | string;
};

const Input = (props: IProps) => {
  return (
    <div
      className={`input-component${
        props.isValid === undefined || props.isValid ? "" : " invalid"
      } ${props.disabled ? " disabled" : ""}${
        props.className ? ` ${props.className}` : ""
      }`}
    >
      {props.label && (
        <label className="input-label" htmlFor={props.id}>
          {props.id
            ? props.label
            : "You need to provide an 'id' prop for label!"}
        </label>
      )}
      <div className="inner-wrapper">
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
