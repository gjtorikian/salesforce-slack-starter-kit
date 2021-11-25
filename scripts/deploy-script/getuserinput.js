const { prompt } = require("enquirer");
const {
  validateAppName,
  getDefaultDevHub,
  generateUniqueAppName
} = require("./util");

const userInputPrompt = async () => {
  const basicInfo = await promptBasicInfo();
  const oauthFlow = basicInfo["oauth-flow"];
  switch (oauthFlow) {
    case "jwt-bearer":
      const jwtInfo = await promptJWTInfo();
      console.log("jwtInfo: " + JSON.stringify(jwtInfo));
      Array.prototype.push.apply(basicInfo, jwtInfo);
      break;
    case "username-password":
      const usernamePasswordInfo = await promptUsernamePasswordInfo();
      console.log(
        "usernamePasswordInfo: " + JSON.stringify(usernamePasswordInfo)
      );
      Array.prototype.push.apply(basicInfo, usernamePasswordInfo);
      break;
    default:
      throw new Error(`Unknown OAuth flow: ${oauthFlow}`);
  }
  return basicInfo;
};

const promptBasicInfo = async () => {
  return (response = await prompt([
    {
      type: "input",
      name: "heroku-app",
      message: "Heroku App Name",
      initial: generateUniqueAppName,
      validate: validateAppName
    },
    {
      type: "password",
      name: "slack-bot-token",
      message: "Slack Bot Token"
    },
    {
      type: "password",
      name: "slack-signing-secret",
      message: "Slack Signing Secret"
    },
    {
      type: "input",
      name: "oauth-flow",
      message:
        "Salesforce OAuth Authorization Flow (username-password,jwt-bearer)",
      initial: "username-password"
    }
  ]));
};

const promptUsernamePasswordInfo = async () => {
  return (response = await prompt([
    {
      type: "input",
      name: "sf-username",
      message: "Salesforce username",
      initial: "username"
    },
    {
      type: "password",
      name: "sf-password",
      message: "Salesforce password",
      initial: "password"
    },
    {
      type: "input",
      name: "sf-login-url",
      message: "Salesforce login URL",
      initial: "https://login.salesforce.com"
    }
  ]));
};

const promptJWTInfo = async () => {
  return (response = await prompt([
    {
      type: "input",
      name: "devhub",
      message: "Existing SFDX DevHub Alias",
      initial: getDefaultDevHub
    },
    {
      type: "input",
      name: "scratchorg",
      message: "SFDX Scratch Org Alias",
      initial: "scratchorg"
    }
  ]));
};

module.exports = {
  userInputPrompt
};
