import "./dropdown.scss";
import { ReactElement, useEffect, useRef, useState } from "react";
import { RiArrowDownSLine, RiCheckLine, RiCloseLine } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi";
import useOutsideClick from "../../hooks/useOutsideClick/useOutsideClick";
import { areObjectsEqual } from "../../helpers/ObjectValidations";

interface IData {
  id: string;
  name: string;
}

interface IProps {
  data: IData[];
  onSelect: (entries: IData[]) => void;
  placeholder: string;

  // OPTIONAL
  startValue?: IData[];

  // SEARCHABLE
  searchable?: boolean; // Default = false. // true = you can enter text
  onSearch?: (value: string) => void; // Provide this if searchable

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

const MINIMUM_INPUT_WAIT_TIME = 100; // In milliseconds
let timer: NodeJS.Timeout | null = null;

const Dropdown = (props: IProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [filtered, setFiltered] = useState<IData[]>(props.data);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.searchable) return;
    setInputText(e.target.value);
    if (timer) clearTimeout(timer);
    timer = setTimeout(
      () => {
        if (props.onSearch) props.onSearch(e.target.value);
        setIsOpen(true);
        console.log("SEARCH TEXT:", e.target.value);
        const filteredList = props.data.filter((data) =>
          data.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFiltered(filteredList);
      },
      props.minimumWaitTime ? props.minimumWaitTime : MINIMUM_INPUT_WAIT_TIME
    );
  };

  const handleSelect = (entry: IData) => {
    if (!props.multiChoice) setIsOpen(false);
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
    if (!props.multiChoice && activeEntries[0])
      setInputText(activeEntries[0].name ? activeEntries[0].name : "");
  }, [activeEntries]);

  useEffect(() => {
    if (props.startValue) setActiveEntries(props.startValue);
  }, [props.startValue]);

  const displayedList = props.searchable ? filtered : props.data;
  return (
    <div
      data-testid={props.testId ? props.testId : "dropdown"}
      ref={dropdownRef}
      className={`dropdown-componenet${
        props.disabled === true ? " Disabled" : ""
      }`}
    >
      {props.label && (
        <label className="input-label" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      <div
        className={`top${props.searchable ? " searchable" : " normal"}`}
        onClick={() => {
          if (props.disabled && props.disabled === true) return;
          setIsOpen(!isOpen);
        }}
      >
        <div className={`text-field`}>
          <input
            disabled={props.disabled === true ? props.disabled : false}
            id={props.id ? props.id : ""}
            readOnly={props.searchable ? false : true}
            type="text"
            name={props.name}
            value={inputText}
            placeholder={props.placeholder}
            onChange={props.searchable ? handleChange : undefined}
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
        {displayedList.map((tag: IData, index) => {
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
        {displayedList.length <= 0 && (
          <div className={`entry disabled`}>
            <span>No hits..</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
