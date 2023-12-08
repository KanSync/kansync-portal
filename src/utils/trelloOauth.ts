import { Request, Response } from "express";
import OAuth from "oauth";
import url from "url";

const requestURL: string = "https://trello.com/1/OAuthGetRequestToken";
const accessURL: string = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL: string = "https://trello.com/1/OAuthAuthorizeToken";
const appName: string = "test_2";
const scope: string = "read,write,account";
const expiration: string = "never";
const key: string = "";
const secret: string = "";
const loginCallback: string =
  "https://local.functions.nhost.run/v1/trello/auth/token";

let token_secret: string = "";

const oauth = new OAuth.OAuth(
  requestURL,
  accessURL,
  key,
  secret,
  "1.0A",
  loginCallback,
  "HMAC-SHA1",
);

export const login = (_request: Request, response: Response) => {
  oauth.getOAuthRequestToken(
    (
      error: any,
      token: string | number,
      tokenSecret: string,
      _results: any,
    ) => {
      if (error) {
        console.error("Error getting OAuth request token:", error);
        response.status(500).send("Error getting OAuth request token");
        return;
      }
      token_secret = tokenSecret;

      response.redirect(
        `${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}`,
      );
    },
  );
};

export const callback = (req: Request, res: Response) => {
  const query = url.parse(req.url!, true).query as {
    oauth_token: string;
    oauth_verifier: string;
  };
  const { oauth_token, oauth_verifier } = query;
  const tokenSecret = token_secret;

  if (!tokenSecret) {
    console.error("Token secret not found for the given OAuth token");
    res.status(400).send("Token secret not found for the given OAuth token");
    return;
  }

  oauth.getOAuthAccessToken(
    oauth_token,
    tokenSecret,
    oauth_verifier,
    (error: any, accessToken: string, _accessTokenSecret: string) => {
      if (error) {
        console.error("Error getting OAuth access token:", error);
        res
          .status(500)
          .send(`Error getting OAuth access token: ${error.message}`);
        return;
      }
      console.log("Access Token:", accessToken);

      res.send("Every thing looks good.");
    },
  );
};
