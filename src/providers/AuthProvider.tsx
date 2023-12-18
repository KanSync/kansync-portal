import { OAuth2Token } from "@badgateway/oauth2-client";
import React from "react";
import { useContext, useState } from "react";

interface IAuthProvider {
  jiraToken?: OAuth2Token;
  githubToken?: OAuth2Token;
  trelloToken?: OAuth2Token;
  setJira: (newToken: OAuth2Token) => void;
  setGithub: (newToken: OAuth2Token) => void;
  setTrello: (newToken: OAuth2Token) => void;
}

const AuthProviderContext = React.createContext<IAuthProvider>({
  jiraToken: undefined,
  githubToken: undefined,
  trelloToken: undefined,
  setJira: (newToken: OAuth2Token) => {},
  setGithub: (newToken: OAuth2Token) => {},
  setTrello: (newToken: OAuth2Token) => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const JIRA_IDENTIFIER = 'Jira'
  const GITHUB_IDENTIFIER = 'Github'
  const TRELLO_IDENTIFIER = 'Trello'

  let jiraState = localStorage.getItem(JIRA_IDENTIFIER)
  let githubState = localStorage.getItem(GITHUB_IDENTIFIER)
  let trelloState = localStorage.getItem(TRELLO_IDENTIFIER)

  const [jiraToken, setJiraToken] = useState<OAuth2Token>(jiraState ? JSON.parse(jiraState) : null);
  const [githubToken, setGithubToken] = useState<OAuth2Token>(githubState ? JSON.parse(githubState) : null);
  const [trelloToken, setTrelloToken] = useState<OAuth2Token>(trelloState ? JSON.parse(trelloState) : null);

  const setJira = (new_token: OAuth2Token) => {
    setJiraToken(new_token);
    localStorage.setItem(JIRA_IDENTIFIER, JSON.stringify(new_token));
  };
  const setGithub = (new_token: OAuth2Token) => {
    setGithubToken(new_token);
    localStorage.setItem(GITHUB_IDENTIFIER, JSON.stringify(new_token));
  };
  const setTrello = (new_token: OAuth2Token) => {
    setTrelloToken(new_token);
    localStorage.setItem(TRELLO_IDENTIFIER, JSON.stringify(new_token));
  };

  return (
    <AuthProviderContext.Provider
      value={{
        jiraToken,
        setJira,
        githubToken,
        setGithub,
        trelloToken,
        setTrello,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
};

const useAuth = () => useContext(AuthProviderContext);

export { AuthProvider, useAuth };
