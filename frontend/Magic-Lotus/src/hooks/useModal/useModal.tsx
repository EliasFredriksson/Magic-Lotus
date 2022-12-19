import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import "./useModal.scss";

interface IModalOptions {
  innerTsx: ReactElement;
  confirmTextOrButton: string | ReactElement;
  cancelTextOrButton?: string | ReactElement;
  onConfirm?: Function;
  onCancel?: Function;
  onClose?: Function;
  flipButtonOrder?: boolean;
}

export default function useModal(
  options: IModalOptions
): [ReactElement, () => void] {
  const [isVisible, setIsVisible] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (isVisible) buttonRef.current?.focus();
  }, [isVisible]);

  const open = useCallback(() => {
    setIsVisible(true);
  }, []);
  const close = useCallback(() => {
    if (options.onClose) options.onClose();
    setIsVisible(false);
  }, [options]);
  const confirm = useCallback(() => {
    if (options.onConfirm) options.onConfirm();
    close();
  }, [close, options]);
  const cancel = useCallback(() => {
    if (options.onCancel) options.onCancel();
    close();
  }, [close, options]);

  const modal = (
    <div className="modal-component">
      <div
        className={`background ${isVisible ? "show" : "hide"}`}
        onClick={close}
      />
      <div className={`modal ${isVisible ? "show" : "hide"}`}>
        <div className="top">
          {options.innerTsx}
          <button className="close" onClick={close}>
            <IoClose />
          </button>
        </div>
        <div
          className="buttons"
          style={{
            flexDirection: `${options.flipButtonOrder ? "row-reverse" : "row"}`,
          }}
        >
          {typeof options.confirmTextOrButton === "string" ? (
            <button
              ref={buttonRef}
              className={`confirm ${!options.cancelTextOrButton && "alone"}`}
              onClick={confirm}
            >
              {options.confirmTextOrButton}
            </button>
          ) : (
            options.confirmTextOrButton
          )}

          {options.cancelTextOrButton &&
            (typeof options.cancelTextOrButton === "string" ? (
              <button className="cancel" onClick={cancel}>
                {options.cancelTextOrButton ? options.cancelTextOrButton : "Ok"}
              </button>
            ) : (
              options.cancelTextOrButton
            ))}
        </div>
      </div>
    </div>
  );

  return [modal, open];
}
