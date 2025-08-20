module.exports = {
  platform: "azure",
  endpoint: "https://dev.azure.com/erik",
  onboarding: true,
  onboardingConfig: {
    extends: ["config:best-practices"],
    packageRules: [
      {
        groupName: ".NET 9 Migration",
        matchPackagePatterns: ["^Microsoft\\.NETCore\\.App$", "^Microsoft\\.AspNetCore\\.App$"],
        allowedVersions: ">=9.0.0"
      },
      {
        matchFiles: ["global.json"],
        groupName: ".NET SDK",
        allowedVersions: ">=9.0.0"
      }
    ]
  },
  requireConfig: "optional",
  autodiscover: false,
  repositories: ["eriklieben/ErikLieben.FA.StronglyTypedIds"],
  token: process.env.RENOVATE_TOKEN,
  extends: [
    "config:best-practices",
    ":dependencyDashboard",
    "security:openssf-scorecard"
  ],
  hostRules: [
    {
      hostType: "github",
      matchHost: "api.github.com",
      token: process.env.RENOVATE_TOKEN
    },
    {
      hostType: "azure",
      matchHost: "dev.azure.com",
      token: process.env.AZURE_DEVOPS_TOKEN
    }
  ],
  timezone: "Europe/Amsterdam",
  gitAuthor: "Renovate Bot <renovate@eriklieben.com>",
  platformAutomerge: true,
  schedule: ["before 6am on monday"],
  prConcurrentLimit: 3,
  prHourlyLimit: 2,
  docker: {
    enabled: true,
    pinDigests: true
  },
  regexManagers: [
    {
      fileMatch: [".*/.*\\.cs$"],
      matchStrings: [
        "WithImage\\(\"(?<depName>[a-zA-Z0-9/_.-]+):(?<currentValue>[0-9a-zA-Z.-]+)\"\\)"
      ],
      datasourceTemplate: "docker",
      versioningTemplate: "docker"
    }
  ],
  labels: ["dependencies"],
  assignees: ["@eriklieben"],
  reviewers: ["@eriklieben"],
  
  // Custom commit message format for "deps: update title"
  commitMessagePrefix: "deps: ",
  commitMessageAction: "update",
  commitMessageTopic: "{{depName}}",
  commitMessageExtra: "to {{newVersion}}",
  commitMessageSuffix: "",
  
  prTitle: "{{commitMessagePrefix}}{{commitMessageAction}} {{commitMessageTopic}} {{commitMessageExtra}}{{commitMessageSuffix}}",
  prBodyTemplate: "{{{header}}}{{{table}}}{{{notes}}}{{{changelogs}}}{{{configDescription}}}{{{controls}}}{{{footer}}}",
  branchPrefix: "renovate/",
  vulnerabilityAlerts: {
    enabled: true
  }
};