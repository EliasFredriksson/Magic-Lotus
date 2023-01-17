import BorderRadius from "../../models/frontend/types/BorderRadius";
import ButtonVariant from "../../models/frontend/types/ButtonVariant";
import FontSize from "../../models/frontend/types/FontSize";
import FontWeight from "../../models/frontend/types/FontWeight";
import "./button.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  borderRadius?: BorderRadius;
}

const Button = (props: Props) => {
  return (
    <button
      {...props}
      className={`button-component${
        props.variant ? ` ${props.variant}` : " primary"
      }${props.className ? ` ${props.className}` : ""} ${
        props.borderRadius ? ` ${props.borderRadius}` : " medium"
      }${props.fontSize ? ` ${props.fontSize}` : " xl"}${
        props.fontWeight ? ` ${props.fontWeight}` : " medium"
      }`}
      tabIndex={props.variant === "link" ? -1 : props.tabIndex}
    >
      {props.children}
    </button>
  );
};

export default Button;
