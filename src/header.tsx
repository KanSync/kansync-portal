import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link to={`/`} className="font-bold">
        KANSYNC
      </Link>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "2em",
        }}
      >
        <Link to={`/about`}>About</Link>
        <Link to={`/dashboard`}>Dashboard</Link>
        <button>Login</button>
      </div>
    </div>
  );
};

export default Header;
