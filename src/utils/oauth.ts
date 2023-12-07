import { OAuth2Client, OAuth2Token } from '@badgateway/oauth2-client';

const REDIRECT_URI = 'http://localhost:5173/callback'
const SCOPE = ['read:jira-work', 'read:jira-user'];
const BACKEND_URL = "https://local.functions.nhost.run/v1/jira/auth/token"

const client = new OAuth2Client({
    server: 'https://auth.atlassian.com',
    clientId: 'jgvPRa4EzDY5U4zwoFeSSqizfPfNuBk1',
    tokenEndpoint: '/oauth/token',
    authorizationEndpoint: '/authorize',
});

// TODO: Hash of the users session ID, works for now but unsafe
const state = 'Safe String';

type Code = string;

export async function oauth_jira() {
    document.location = await client.authorizationCode.getAuthorizeUri({
        redirectUri: REDIRECT_URI,
        state: state,
        scope: SCOPE,
    });
}

// Inspired by https://github.com/badgateway/oauth2-client/blob/main/src/client/authorization-code.ts#L122
async function validate_url(url: string | URL): Promise<Code> {

    const URLQueries = new URL(url).searchParams;

    if (URLQueries.has('error')) {
        throw new Error(
            URLQueries.get('error_description') ?? 'OAuth2 error'
        );
    }

    if (!URLQueries.has('code')) throw new Error(`The url did not contain a code parameter ${url}`);

    if (state !== URLQueries.get('state')) {
        throw new Error(`Expected state: ${state} did not match received state: ${URLQueries.get('state')}`);
    }

    return URLQueries.get('code')!;
}

export async function get_token_from_backend(): Promise<OAuth2Token> {
    // @ts-ignore
    let callback_code = await validate_url(document.location);
    let response = await fetch(BACKEND_URL + '?' + new URLSearchParams({ code: callback_code }))

    if (!response.ok) {
        throw new Error(`Failed getting token: ${response.status}`);
    }

    return response.json()
}