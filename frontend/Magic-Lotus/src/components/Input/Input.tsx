import "./input.scss";
import React from "react";

interface IProps {
  // INPUT TAG
  placeholder: string;
  type: string;
  name?: string;
  // LABELS
  label?: string;
  id?: string;
  // INPUT STATE
  value: string;
  onChange: (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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
}

const Input = (props: IProps) => {
  return (
    <div
      className={`input-component ${
        props.isValid === undefined || props.isValid ? "" : "invalid"
      } ${props.disabled ? "disabled" : ""}`}
    >
      {props.label && (
        <label className="input-label" htmlFor={props.id}>
          {props.id
            ? props.label
            : "You need to provide an 'id' prop for label!"}
        </label>
      )}
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
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            props.onChange(e);
          }}
        />
      )}
      {props.afterDec && <div className="after">{props.afterDec}</div>}

      <span className={`validation-msg ${!props.isValid ? "show" : "hide"}`}>
        {props.validationMsg}
      </span>
    </div>
  );
};

export default Input;
