import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get_token_from_backend, validate_oauth_origin } from "../utils/oauth";
import { useAuth } from "../providers/AuthProvider";

const Callback = () => {
  const { setJira, setGithub, setTrello } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function getToken() {
      let { code, oauth, backend_url, setToken } = await validate_oauth_origin(
        document.URL,
        setJira,
        setGithub,
        setTrello,
      );
      let oauthToken = await get_token_from_backend(backend_url, code, oauth);

      setToken(oauthToken);
    }

    getToken();
    navigate("/dashboard");
  }, [navigate, setJira, setGithub, setTrello]);

  return <></>;
};

export default Callback;
