import "./dropdown.scss";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { RiArrowDownSLine, RiCheckLine, RiCloseLine } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi";
import useOutsideClick from "../../hooks/useOutsideClick/useOutsideClick";
import { areObjectsEqual } from "../../helpers/ObjectValidations";
import useKeyboard from "../../hooks/useKeyboard/useKeyboard";

type DataCategory = {
  id: string;
  title: string;
  name?: undefined;
  meta?: undefined;
};
type DataEntry = {
  id: string;
  title?: undefined;
  name: string;
  meta?: any;
};

type Data = DataEntry | DataCategory;

interface IProps {
  data: Data[];
  onSelect: (entries: Data[]) => void;
  placeholder: string;

  // OPTIONAL
  startValue?: Data[];

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

  // OPEN HEIGHT
  menuHeight?: string;
}

const MINIMUM_INPUT_WAIT_TIME = 100; // In milliseconds
let timer: NodeJS.Timeout | null = null;

const Dropdown = (props: IProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [filtered, setFiltered] = useState<Data[]>(props.data);
  const [activeEntries, setActiveEntries] = useState<Data[]>(
    props.startValue ? props.startValue : []
  );

  useKeyboard({
    targetKeys: "Enter",
    onKeyDown: () => {
      if (!isOpen) return;
      if (filtered.length === 1) {
        // UGLY SOLUTIOn
        handleSelect(filtered[0] as DataEntry);
      }
    },
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => {
    if (!props.multiChoice) {
      if (activeEntries[0]) {
        // POTENTIAL UGLY SOLUTION HERE
        setInputText(activeEntries[0].name ? activeEntries[0].name : "");
      }
    }
    setIsOpen(false);
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!props.searchable) return;
      setInputText(e.target.value);
      if (timer) clearTimeout(timer);
      timer = setTimeout(
        () => {
          if (props.onSearch) props.onSearch(e.target.value);
          setIsOpen(true);
          const filteredList = props.data.filter((data) => {
            if (data.name)
              return data.name
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
            else return true;
          });
          setFiltered(filteredList);
        },
        props.minimumWaitTime ? props.minimumWaitTime : MINIMUM_INPUT_WAIT_TIME
      );
    },
    [props.searchable, props.data, props.onSearch, props.minimumWaitTime]
  );

  const handleSelect = useCallback(
    (entry: DataEntry) => {
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
    },
    [props.multiChoice, activeEntries]
  );

  const removeActiveEntry = useCallback(
    (entry: Data) => {
      const filtered = activeEntries.filter((activeEntry) => {
        return !areObjectsEqual(entry, activeEntry);
      });
      setActiveEntries(filtered);
      props.onSelect(filtered);
    },
    [activeEntries, props.onSelect]
  );

  useEffect(() => {
    if (!props.multiChoice && activeEntries[0])
      setInputText(activeEntries[0].name ? activeEntries[0].name : "");
  }, [activeEntries]);

  useEffect(() => {
    if (props.startValue) setActiveEntries(props.startValue);
  }, [props.startValue]);

  useEffect(() => {
    if (props.searchable) setFiltered(props.data);
  }, [props.data]);

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
          setIsOpen(true);
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
        // TO ANIMATE OPEN AND CLOSING + CUSTOMIZE MENU HEIGHT
        style={{
          maxHeight: isOpen
            ? props.menuHeight
              ? props.menuHeight
              : "30rem"
            : "0px",
        }}
      >
        {/* RENDERED LIST */}
        {displayedList.map((tag: Data, index) => {
          if (!tag.id) return;
          const isActive = activeEntries.find((active) => active.id === tag.id);
          const id = `${tag.id}-${index}`;
          // IF ITS A CATEGORY TITLE
          if (tag.title) {
            return (
              <div key={id} className="category">
                <span>{tag.title}</span>
              </div>
            );
          }
          // IF ITS A NORMAL ENTRY
          else if (tag.name) {
            return (
              <div
                className={`entry${isActive ? " active" : ""}`}
                key={id}
                onClick={() => {
                  handleSelect(tag);
                }}
              >
                <span>
                  {tag.name} {isActive && <RiCheckLine />}
                </span>
              </div>
            );
          } else return <></>;
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
