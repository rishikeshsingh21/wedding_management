const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  const baseStyles =
    "rounded-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-[#9E3A4A] text-white hover:bg-[#D16C7C] focus:ring-[#F2A1B3]",
    secondary:
      "bg-[#FCE8EC] text-[#9E3A4A] hover:bg-[#F2C1C8] focus:ring-[#F2A1B3]",
    outline:
      "border border-[#D16C7C] text-[#D16C7C] hover:bg-[#FCE8EC] focus:ring-[#F2A1B3]",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
