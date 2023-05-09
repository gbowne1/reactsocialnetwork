# Contributing to React Social Network development

We welcome Pull Requests (PR's) as well as having people working on fixing it's current issues. If you are coming to this project new.
If you notice an issue with this app, please feel free to open an issue.

A lot of developers prefer asking if they could contribute or be assigned a task as a reply to a reported issue in the Issues tab. This is great. We have a strict no gate-keeping policy in any of these projects. You are welcome to work on any task/issue, just let us know that you are going to work on the an issue.
If you are unsure of the style and design, there is an issue here: <https://github.com/gbowne1/reactsocialnetwork/discussions/36>. Typically, if you think it will take you longer than 72 hours after having been assigned, to submit a PR, let us know that way issues do not go stale.

Some tasks may not be beginner friendly even if tagged `good first issue`.. so try and judge the task accordingly. If you are a beginner, there are smaller tasks a beginner can work on such as style issues.

You should already be familiar with React 17 and or 18, JavaScript ES5/ES6/ES7.

## Style

I have not created an official style guide yet. If anyone would like to create a style guide for us. Create a Discussion.

The layout is a 3 column layout, starting with desktop view with a 200-250px left panel, 1400-1500px center panel and a 200-250px right panel, similar to Facebook's desktop view when looking at the root '/'.

## Development

If you are not sure what to work on, review the issues list. There are also TODO's listed in the included TODO.md file.

**Note:** In case you need to build an UI you can use one of our [reusable-components](REUSABLE_COMPONENTS.md) (located under [src/components](../src/components) ), in order
to not have to reivent the wheel.

### PR's

When you do a PR on GitHub, Please make sure you complete the section on the right, Assignees, Reviewers, Labels, Projects, Milestone(s) and Development before you submit the PR. Please also share a screenshot or show the working fix in the Pull Request message and a brief description of what you fixed. Blank issues and descriptions may not get merged.

- Link an issue to Development that the PR will close
- Make sure that you tag a reviewer i.e. @gbowne1
- Pick appropriate labels from Labels
- Make sure you are the assignee to the PR.
- Milestone, choose Frontend or Backend (more may come later on)

### Issues

@gbowne1 will assign users to issues on a first come, first serve basis. In the future I would like a minimum of 2 people doing Frontend and 2 people doing Backend, then we can assign specific groups of people taking care of things like CSS, Components, etc.

## Editor & IDE

The repository contains folders with project appropriate settings and configurations for Visual Studio and Visual Studio code but beyond that, We are tool and editor/IDE agnostic so you can use whatever editor or IDE or you like.

## Settings & Configuration

The included workspaces, settings, configurations and plugins are for:

Babel
Webpack
ESLint
Prettier
VSCode (.vscode)
Visual Studio 2019+ (.vs)
GitHub (.github)

These may not be 100% correct, so if you can contribute to them to make them more accurate for React development it is welcomed.

## Tech Stack

This project was bootstrapped with Create React App.
This application is built with:

- React 18.0 - 18.2
- CSS3
- JavaScript (ES5/ES6/ES7/ES2015/etc.)
- Node
- Express
- Material UI v5.11.6

## Branches

Our branches follow GitFlow / GitHub Flow as a general rule.

- [ main ] main working branch
- [ master ] Permanent // Archive branch
- [ test ] untested code
- Feature Branch # of feature - {feature}
- [bugfix - { fixed bug }]
- [hotfix - { fix }]

Use a test branch to commit/push code that you believe should work but is not completely tested.
