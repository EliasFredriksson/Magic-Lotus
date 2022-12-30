import "./dropdownSearch.scss";
import React, { ReactElement, useRef, useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick/useOutsideClick";
import IData from "../../../models/general/IData";
import Spinner from "../spinner/Spinner";
import { RiSearchLine } from "react-icons/ri";

interface IProps {
  id: string;
  name: string;
  placeholder: string;
  data: IData[];
  onSelect: (value: IData) => void;
  onSearch: (value: string) => void;

  // OPTIONAL
  testId?: string;
  disabled?: boolean;
  menuPosition?: "absolute" | "relative";
  closeOnSelect?: boolean;
  openOnFocus?: boolean;
  closeOnBlur?: boolean;
  minimumWaitTime?: number;
}

const MINIMUM_INPUT_WAIT_TIME = 500; // In milliseconds
let timer: NodeJS.Timeout | null = null;

const DropdownSearch = (props: IProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusBorder, setFocusBorder] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  const handleSelect = (entry: IData) => {
    setSearchText(entry.name);
    if (props.closeOnSelect === undefined || props.closeOnSelect === true)
      setIsOpen(false);
    props.onSelect(entry);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setSearchText(e.target.value);
    if (timer) clearTimeout(timer);
    timer = setTimeout(
      () => {
        if (props.onSearch) props.onSearch(e.target.value);
        setIsOpen(true);
        setIsLoading(false);
        console.log("school input :", e.target.value);
        //if this is ===
      },
      props.minimumWaitTime ? props.minimumWaitTime : MINIMUM_INPUT_WAIT_TIME
    );
  };

  return (
    <div
      data-testid={props.testId ? props.testId : "dropdown"}
      ref={dropdownRef}
      className={`dropdown-search${props.disabled ? " Disabled" : ""}`}
    >
      <div className={focusBorder ? "top focus-border" : "top"}>
        <input
          disabled={props.disabled ? props.disabled : false}
          id={props.id ? props.id : ""}
          type="text"
          name={props.name}
          value={searchText}
          onChange={handleChange}
          placeholder={props.placeholder}
          onFocus={() => {
            if (props.openOnFocus) setIsOpen(true);
            setFocusBorder(true);
          }}
          onBlur={() => {
            setFocusBorder(false);
          }}
        />

        {isLoading ? (
          <Spinner size="small" />
        ) : (
          <RiSearchLine className="magnify" />
        )}
      </div>
      <div
        className={`menu ${isOpen ? "opened" : "closed"}${
          props.menuPosition ? " " + props.menuPosition : ""
        }`}
      >
        {props.data.length <= 0 ? (
          <div className="entry disabled">
            <span>{"Inga träffar..."}</span>
          </div>
        ) : (
          props?.data.map((entry: IData) => {
            return (
              <div
                className="entry"
                key={entry.id}
                onClick={() => {
                  handleSelect(entry);
                }}
              >
                <span>{entry.name}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DropdownSearch;
