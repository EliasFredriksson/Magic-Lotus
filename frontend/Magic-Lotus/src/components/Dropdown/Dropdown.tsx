import "./dropdown.scss";
import { ReactElement, useEffect, useRef, useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick/useOutsideClick";
import IData from "../../../models/general/IData";
import { RiArrowDownSLine, RiCheckLine, RiCloseLine } from "react-icons/ri";
import { areObjectsEqual } from "../../../helpers/ObjectValidations";
import { areListsEqual } from "../../../helpers/ListValidations";
import { FiTrash2 } from "react-icons/fi";

interface IProps {
  data: IData[];
  onSelect: (entries: IData[]) => void;
  placeholder: string;

  // OPTIONAL
  startValue?: IData[];

  // IF TRUE, ONLY ALLOWS MULTIPLE ENTRIES TO BE CHOSEN.
  // onSelect WILL SEND BACK A LIST WITH ONLY
  // ONE IDATA OBJECT IN IT.
  multiChoice?: boolean;

  // MORE OPTIONAL CONFIGS
  id?: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  menuPosition?: "absolute" | "relative";
  stayOpenOnSelect?: boolean;
  minimumWaitTime?: number;
  onError?: (error: string) => void;
  testId?: string;
}

const Dropdown = (props: IProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");

  const [activeEntries, setActiveEntries] = useState<IData[]>(
    props.startValue ? props.startValue : []
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => {
    if (!props.multiChoice) {
      if (activeEntries[0]) setInputText(activeEntries[0].name);
    }
    setIsOpen(false);
  });

  const handleSelect = (entry: IData) => {
    if (!props.stayOpenOnSelect) setIsOpen(false);
    if (activeEntries.find((tag) => tag.id === entry.id)) {
      if (props.multiChoice) removeActiveEntry(entry);
    } else {
      if (!props.multiChoice) {
        setInputText(entry.name);
        setActiveEntries([entry]);
        props.onSelect([entry]);
      } else {
        setActiveEntries([...activeEntries, entry]);
        props.onSelect([...activeEntries, entry]);
      }
    }
  };

  const removeActiveEntry = (givenSchool: IData) => {
    const filtered = activeEntries.filter((school) => {
      return !areObjectsEqual(givenSchool, school);
    });
    setActiveEntries(filtered);
    props.onSelect(filtered);
  };

  useEffect(() => {
    if (!areListsEqual(props.data, activeEntries))
      setActiveEntries(props.startValue ? props.startValue : []);
  }, [props.data, props.startValue]);

  useEffect(() => {
    if (!props.multiChoice && activeEntries[0])
      setInputText(activeEntries[0].name ? activeEntries[0].name : "");
  }, [activeEntries]);

  useEffect(() => {
    if (props.startValue) setActiveEntries(props.startValue);
  }, [props.startValue]);

  return (
    <div
      data-testid={props.testId ? props.testId : "dropdown"}
      ref={dropdownRef}
      className={`dropdown${props.disabled === true ? " Disabled" : ""}`}
    >
      {props.label && (
        <label className="input-label" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      <div
        className="top"
        onClick={() => {
          if (props.disabled && props.disabled === true) return;
          setIsOpen(!isOpen);
        }}
      >
        <div className="text-field">
          <input
            disabled={props.disabled === true ? props.disabled : false}
            id={props.id ? props.id : ""}
            readOnly
            type="text"
            name={props.name}
            value={inputText}
            placeholder={props.placeholder}
          />
          <RiArrowDownSLine className={`arrow ${isOpen ? "open" : "close"}`} />
        </div>
        {activeEntries.length > 0 && props.multiChoice ? (
          <div className="active-entries">
            <div className="entries-wrapper">
              {activeEntries.map((tag, index) => {
                return (
                  <div key={index} className="active-entry">
                    <span>{tag.name}</span>
                    <RiCloseLine
                      className="remove-tag-button"
                      onClick={() => {
                        removeActiveEntry(tag);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            {props.multiChoice && (
              <span
                className="clear-tags"
                onClick={() => {
                  setActiveEntries([]);
                  props.onSelect([]);
                }}
              >
                <FiTrash2 />
              </span>
            )}
          </div>
        ) : null}
      </div>
      <div
        className={`menu ${isOpen ? "opened" : "closed"}${
          props.menuPosition ? " " + props.menuPosition : ""
        }`}
      >
        {props.data.map((tag: IData, index) => {
          if (!tag.id || !tag.name || tag.name.length <= 0) return;
          const isActive = activeEntries.find((active) => active.id === tag.id);
          return (
            <div
              className={`entry${isActive ? " active" : ""}`}
              key={`${tag.id}-${index}`}
              onClick={() => {
                handleSelect(tag);
              }}
            >
              <span>
                {tag.name} {isActive && <RiCheckLine />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
