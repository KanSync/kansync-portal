// trello login component
import { useState, useEffect } from "react";

const TrelloOAuthComponent = () => {
  const [authUrl, setAuthUrl] = useState("http://localhost:3000");

  useEffect(() => {
    // Fetch the authentication URL when the component mounts
    const fetchAuthUrl = async () => {
      try {
        const response = await fetch("http://localhost:3000/");
        const data = await response.json();
        setAuthUrl(data.authUrl);
      } catch (error) {
        console.error("Error fetching Trello authentication URL:", error);
      }
    };

    fetchAuthUrl();
  }, []);

  const handleTrelloAuth = () => {
    // Open a new window or redirect to the Trello authentication URL
    window.open(authUrl, "http://localhost:3000");
  };

  return (
    <div>
      <h2>Trello OAuth1 Authentication</h2>
      <button onClick={handleTrelloAuth}>Authenticate with Trello</button>
    </div>
  );
};

export default TrelloOAuthComponent;
