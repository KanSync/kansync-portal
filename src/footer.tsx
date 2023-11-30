import PuzzlePiece from "./assets/puzzle-piece.svg";

const Footer = () => {
  return (
    <div className="bg-secondary flex flex-col h-96 place-items-center place-content-center my-8">
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      <img src={PuzzlePiece} className="w-8" />
      Maria Lopez, VP of Design at Meshery
    </div>
  );
};

export default Footer;
