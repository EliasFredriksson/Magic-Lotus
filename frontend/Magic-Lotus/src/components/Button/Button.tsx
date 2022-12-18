import "./button.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "primary" | "secondary" | "success" | "alert";
  children?: React.ReactNode;
}

const Button = ({ variant, className, children, ...rest }: Props) => {
  return (
    <button
      className={`button-component ${
        variant ? variant : "primary"
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
