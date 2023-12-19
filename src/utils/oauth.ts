import { OAuth2Client, OAuth2Token } from '@badgateway/oauth2-client';

type Code = string;
type OAuth1 = { token: string, tokenSecret: string, verifier: string };

const REDIRECT_URI: string = import.meta.env.VITE_REDIRECT_URI;
const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;
const APP_NAME: string = import.meta.env.VITE_APP_NAME;

const TOKEN_URL = {
    jira: BACKEND_URL + "/jira/auth/token",
    github: BACKEND_URL + "/github/auth/token",
    trello: BACKEND_URL + "/trello/auth/token"
}

export const SCOPE = {
    jira: ['read:jira-work', 'read:jira-user'],
    github: ['repo', 'read:project', 'read:org'],
    trello: ['read', 'write', 'account'],
}

const AUTHORIZE_URL = "https://trello.com/1/OAuthAuthorizeToken";
const EXPIRATION = "never";

// TODO: Hash of the users session ID, works for now but unsafe
export const STATE = {
    jira: 'jira-',
    github: 'github-'
};

export const jira_client = new OAuth2Client({
    server: 'https://auth.atlassian.com',
    clientId: 'jgvPRa4EzDY5U4zwoFeSSqizfPfNuBk1',
    tokenEndpoint: '/oauth/token',
    authorizationEndpoint: '/authorize',
});

export const github_client = new OAuth2Client({
    server: "https://github.com",
    clientId: "e6afa30d9b65e51b2332",
    tokenEndpoint: "/login/oauth/access_token",
    authorizationEndpoint: "/login/oauth/authorize",
});

export async function oauth(scope: string[], state: string, client: OAuth2Client) {
    document.location = await client.authorizationCode.getAuthorizeUri({
        redirectUri: REDIRECT_URI,
        state: state,
        scope: scope,
    });
}

// Inspired by https://github.com/badgateway/oauth2-client/blob/main/src/client/authorization-code.ts#L122
/** 
* Validates which provider the oauth code comes from and returns correct params to get and set token
*
* Note: The two set functions are needed as we can't initialise a context here
* 
* @param url - The callback URL to get the code from 
* @param setJira - Function to save Jira token
* @param setGithub - Function to save Github token
* 
* @returns Code and url to get token. Set function for corresponding platform.
*/
export async function validate_oauth_origin(
    url: string | URL,
    setJira: (newToken: OAuth2Token) => void,
    setGithub: (newToken: OAuth2Token) => void,
    setTrello: (newToken: OAuth2Token) => void
):
    Promise<{
        code?: Code,
        oauth?: OAuth1,
        backend_url: URL,
        setToken: (newToken: OAuth2Token) => void
    }> {
    const URLQueries = new URL(url).searchParams;

    if (URLQueries.has('error')) {
        throw new Error(
            URLQueries.get('error_description') ?? 'OAuth2 error'
        );
    }

    let backend_url: URL;
    let setToken: (newToken: OAuth2Token) => void;

    if (URLQueries.has('oauth_token') && URLQueries.has('oauth_verifier')) {
        backend_url = new URL(TOKEN_URL.trello);
        setToken = setTrello;
        let oauth = {
            token: URLQueries.get('oauth_token')!,
            tokenSecret: sessionStorage.getItem("tokenSecret")!,
            verifier: URLQueries.get('oauth_verifier')!
        }

        return { oauth: oauth, backend_url: backend_url, setToken: setToken }
    }

    if (!URLQueries.has('code')) throw new Error(`The url did not contain a code parameter ${url}`);

    switch (URLQueries.get('state')) {
        case STATE.jira:
            backend_url = new URL(TOKEN_URL.jira);
            setToken = setJira;
            break;
        case STATE.github:
            backend_url = new URL(TOKEN_URL.github);
            setToken = setGithub;
            break;

        default:
            throw new Error(`Expected states: ${STATE} did not match received state: ${URLQueries.get('state')}`);
    }

    return { code: URLQueries.get('code')!, backend_url: backend_url, setToken: setToken };
}

export async function get_token_from_backend(backend_url: URL, code?: Code, oauth?: OAuth1): Promise<OAuth2Token> {
    let response;

    if (code) {
        response = await fetch(backend_url + '?' + new URLSearchParams({ code: code }))
    }

    if (oauth) {
        response = await fetch(backend_url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(oauth)
        })
    }

    if (response === undefined) {
        throw new Error(`Failed getting token`);
    }

    if (!response.ok) {
        throw new Error(`Failed getting token: ${response.status}`);
    }

    return response.json()
}

async function get_trello_request_token(): Promise<{ token: string, tokenSecret: string }> {
    let response = await fetch(BACKEND_URL + "/trello/auth/oauth1")

    return (await response.json());
}

export async function trello_redirect() {
    let { token, tokenSecret } = await get_trello_request_token();

    let params = new URLSearchParams({
        scope: SCOPE.trello.join(","),
        oauth_token: token,
        name: APP_NAME,
        expiration: EXPIRATION
    });

    sessionStorage.setItem("tokenSecret", tokenSecret);

    window.location.replace(`${AUTHORIZE_URL}?${params}`);
}