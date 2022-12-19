import "./button.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary" | "success" | "alert" | "link";
  children?: React.ReactNode;
  borderRadius?: "small" | "medium" | "large" | "none";
}

const Button = ({
  variant,
  className,
  children,
  tabIndex,
  borderRadius,
  ...rest
}: Props) => {
  return (
    <button
      className={`button-component ${variant ? variant : "primary"} ${
        className ? className : ""
      } ${borderRadius ? borderRadius : "medium"}`}
      tabIndex={variant === "link" ? -1 : tabIndex}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
