import FontSize from "../../models/frontend/types/FontSize";
import FontWeight from "../../models/frontend/types/FontWeight";
import "./button.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary" | "success" | "alert" | "link" | "icon";
  children?: React.ReactNode;
  borderRadius?: "small" | "medium" | "large" | "none";
  fontSize?: FontSize;
  fontWeight?: FontWeight;
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
