import { StandalonePreference } from "@commure/smart-core";

export const smartConfig = {
  clientId: "smart_hello_world",
  scopes: ["launch", "openid", "fhiruser", "patient/*.read"],
  redirectUri: `http://localhost:1234/callback`,
  standaloneLaunch: StandalonePreference.IfNecessary,
  fhirBaseUrl: 'https://api-21271434.developer.commure.com/api/v1/r4'
};
