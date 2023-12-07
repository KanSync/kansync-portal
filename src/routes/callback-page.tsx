import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get_token_from_backend } from "../utils/oauth";
import { useAuth } from "../providers/AuthProvider";

const Callback = () => {
  const {setJira} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function getToken() {
      let oauthToken = await get_token_from_backend();

      setJira(oauthToken)
    }

    getToken();
    navigate("/dashboard");
  }, [navigate, setJira]);

  return <></>;
};

export default Callback;
