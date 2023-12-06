const JuicyButton = ({
  onClick,
  children,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-text text-background p-4 rounded-full hover:bg-text/80 shadow-lg transform hover:scale-110 transition duration-300 ease-in-out active:scale-75"
    >
      {children}
    </button>
  );
};

export default JuicyButton;
