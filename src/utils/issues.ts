import { OAuth2Token } from "@badgateway/oauth2-client";
import { IUnifiedIssue } from "../interfaces/issues";
import conv_response_to_unified from "./parse";

const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;
export const BACKEND_JIRA_URL = new URL(BACKEND_URL + "/jira/");
export const BACKEND_GITHUB_URL = new URL(BACKEND_URL + "/github/");
export const BACKEND_TRELLO_URL = new URL(BACKEND_URL + "/trello/");

export type BaseParams = {
    user?: string,
    update?: `${boolean}`,
    project_name?: string,
}

type JiraParams = BaseParams & {
    projectKey: string,
    name: string
}

type GithubParams = BaseParams & {
    repo: string,
    projectName: string
}

type TrelloParams = BaseParams & {
    boardId: string,
}

export async function getIssues(
    backend_url: URL,
    params: JiraParams | GithubParams | TrelloParams,
    oAuthToken: OAuth2Token,
): Promise<IUnifiedIssue[] | undefined> {
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

    if (!result.ok) {
        return undefined;
    }

    return conv_response_to_unified(await result.json()).issues;
}