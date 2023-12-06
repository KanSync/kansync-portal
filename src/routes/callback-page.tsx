import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get_token_from_backend } from "../utils/oauth";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function getToken() {
      await get_token_from_backend();
    }

    getToken();
  }, []);

  navigate("/");

  return <></>;
};

export default Callback;
