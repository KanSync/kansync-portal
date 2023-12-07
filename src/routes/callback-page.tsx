import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get_token_from_backend } from "../utils/oauth";
import { useAuth } from "../providers/AuthProvider";

const Callback = () => {
  const {setToken} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function getToken() {
      let oauthToken = await get_token_from_backend();

      setToken(oauthToken)
    }

    getToken();
    navigate("/");
  }, [navigate, setToken]);

  return <></>;
};

export default Callback;
