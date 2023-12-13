import { OAuth2Token } from "@badgateway/oauth2-client";

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;
export const BACKEND_JIRA_URL = new URL(BACKEND_URL + "/jira/");
export const BACKEND_GITHUB_URL = new URL(BACKEND_URL + "/github/");

type JiraParams = {
    projectKey: string,
    name: string
}

type GithubParams = {
    repo: string,
    projectName: string
}

export async function getIssues(
    backend_url: URL,
    params: JiraParams | GithubParams,
    oAuthToken: OAuth2Token,
) {
    const result = await fetch(
        backend_url +
        "?" +
        new URLSearchParams(params),
        {
            headers: {
                Authorization: "Bearer " + oAuthToken.accessToken,
                "Content-Type": "application/json",
            },
        },
    );

    return await result.json();
}