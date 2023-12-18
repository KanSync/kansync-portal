import { OAuth2Client, OAuth2Token } from '@badgateway/oauth2-client';

type Code = string;

const REDIRECT_URI: string = import.meta.env.VITE_REDIRECT_URI;
const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;
const JIRA_TOKEN_URL = BACKEND_URL + "/jira/auth/token";
const GITHUB_TOKEN_URL = BACKEND_URL + "/github/auth/token";
export const SCOPE = {
    jira: ['read:jira-work', 'read:jira-user'],
    github: ['repo', 'read:project', 'read:org']
}

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
    setGithub: (newToken: OAuth2Token) => void
):
    Promise<{ code: Code, backend_url: URL, setToken: (newToken: OAuth2Token) => void }> {
    const URLQueries = new URL(url).searchParams;

    if (URLQueries.has('error')) {
        throw new Error(
            URLQueries.get('error_description') ?? 'OAuth2 error'
        );
    }

    if (!URLQueries.has('code')) throw new Error(`The url did not contain a code parameter ${url}`);

    let backend_url: URL;
    let setToken: (newToken: OAuth2Token) => void;

    switch (URLQueries.get('state')) {
        case STATE.jira:
            backend_url = new URL(JIRA_TOKEN_URL);
            setToken = setJira;
            break;
        case STATE.github:
            backend_url = new URL(GITHUB_TOKEN_URL);
            setToken = setGithub;
            break;

        default:
            throw new Error(`Expected states: ${STATE} did not match received state: ${URLQueries.get('state')}`);
    }

    return { code: URLQueries.get('code')!, backend_url: backend_url, setToken: setToken };
}

export async function get_token_from_backend(backend_url: URL, code: Code): Promise<OAuth2Token> {
    let response = await fetch(backend_url + '?' + new URLSearchParams({ code: code }))

    if (!response.ok) {
        throw new Error(`Failed getting token: ${response.status}`);
    }

    return response.json()
}