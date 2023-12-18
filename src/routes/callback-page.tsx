import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get_token_from_backend, validate_oauth_origin } from "../utils/oauth";
import { useAuth } from "../providers/AuthProvider";

const Callback = () => {
  const { setJira, setGithub } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function getToken() {
      let { code, backend_url, setToken } = await validate_oauth_origin(
        document.URL,
        setJira,
        setGithub,
      );
      let oauthToken = await get_token_from_backend(backend_url, code);

      setToken(oauthToken);
    }

    getToken();
    navigate("/dashboard");
  }, [navigate, setJira, setGithub]);

  return <></>;
};

export default Callback;
