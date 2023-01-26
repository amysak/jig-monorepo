## Implementation checklist:

- [x] Migrate to Vite
- [x] Tie client & jobs modules
- [x] Setup react-query-devtools
- [x] Finish single job page
- [x] Code polishing in core modules of an app
- [x] Please get rid of Redux where it is redundant and stick to using
      react-query if it is possible. Redux is good for enormous data flows and
      big chains of operations that need structuring. Current structure of Redux
      actions and Sagas create more complexity instead of simplifying the
      application.
- [x] Migrate to react-query
- [x] Finish job module
- [x] Implement basic caching
- [x] Implement own design system using AntDesign & Styled Components
- [x] Fix dashboard stats logic and fix charts
- [x] Get rid of unused or redundant dependencies in package.json and replace
      their usages in code if necessary
- [x] Move to monorepo
- [x] Finish migrating AntDesign v4 to v5
- [x] Finish updating packages
- [x] 🔥 Start cabinet setup
- [ ] Complete data rendering and editing (cabinets and others)
- [ ] ❗ Configure antd theme accordingly (some of the styles corrupted for
      various reasons)
- [ ] ❗ Remove SCSS where possible and get rid of !important
- [ ] Fix problem with injecting too much CSS from Vite
- [ ] Fix redundant footer whitespaces
- [ ] Finish authorization
- [ ] Finish job's client page (select from all client names & submit address
      override for job)
- [ ] Create global date object and reuse it from utils
- [ ] [Remove default exports](https://www.reddit.com/r/javascript/comments/x3hsov/default_exports_in_javascript_modules_are_terrible/)

```bash
git clone git@github.com:jigbid/web.git
```

## Installing all dependencies

```bash
cd web
yarn
```

## Available Scripts

**Runs the app in the development mode** (🚀)

###

```bash
yarn start
```

Open http://localhost:3000 to view it in the browser.

**Builds the app for production to the build folder**(👷)

```bash
 yarn build
```

**env:** 🚀 | 👷

     NODE_ENV
     API_HOST // this is going to be removed after complete migration to v2
     API_HOST_V2

## Tools

[serve](https://www.npmjs.com/package/serve)

> serve helps you serve a static site, single page application or just a static
> file (no matter if on your device or on the local network). It also provides a
> neat interface for listing the directory's contents:

[ts-migrate](https://github.com/airbnb/ts-migrate/tree/master/packages/ts-migrate-plugins "plugins")

> ts-migrate is a tool for helping migrate code to TypeScript. It takes a
> JavaScript, or a partial TypeScript, project in and gives a compiling
> TypeScript project out.

## Visual Studio Code extensions

[Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint "Eslint")
|
[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode "Prettier")

## Requirements

```bash
$ node -v
v14.18.0
```

```bash
$ yarn -v
1.22.4
```
