const JuicyButton = ({
  onClick,
  children,
  className,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={
        "text-background p-4 rounded-full hover:bg-text/80 shadow-lg transform hover:scale-110 transition duration-300 ease-in-out active:scale-75 " +
        className
      }
    >
      {children}
    </button>
  );
};

export default JuicyButton;
