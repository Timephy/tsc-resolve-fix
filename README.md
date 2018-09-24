# tsc-resolve-fix 
## A tool for resolving typescript modules defined in tsconfig.json 

This package resolves non-relative imports to their relative path.
This was possible with "tsc-resolve" by Dimitar Mazhlekov, but in his version it was not possible to do the following:
```json
// tsconfig.json
"paths": {
    "@util/*": [
        "util/*"
    ]
}
```
```typescript
// index.js
import * as someUtility from "@utils/someUtility";
```
With this package you can resolve further paths (e.g. "someUtility") after the non-relative path (e.g. "@util").
The old version only allowed for one non-relative path to resolve to one file/directory.

<p>
  <a href="https://travis-ci.org/mazhlekov/tsc-resolve">
    <img
      alt="build:?"
      src="https://img.shields.io/travis/mazhlekov/tsc-resolve/master.svg?style=flat-square"
    />
  </a>
  <a href="https://www.npmjs.com/package/tsc-resolve">
    <img
      alt="NPM package version"
      src="https://img.shields.io/badge/node-%3E=4.2.0-blue.svg?style=flat-square"
    />
  </a>
  <a href="https://snyk.io/test/github/mazhlekov/tsc-resolve">
    <img src="https://snyk.io/test/github/mazhlekov/tsc-resolve/badge.svg?style=flat-square" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/mazhlekov/tsc-resolve" style="max-width:100%;">
  </a>
  <a href="https://www.bithound.io/github/mazhlekov/tsc-resolve/master/dependencies/npm">
    <img src="https://www.bithound.io/github/mazhlekov/tsc-resolve/badges/dependencies.svg" alt="bitHound Dependencies">
  </a>
  <a href="https://www.bithound.io/github/mazhlekov/tsc-resolve/master/dependencies/npm">
    <img src="https://www.bithound.io/github/mazhlekov/tsc-resolve/badges/devDependencies.svg" alt="bitHound Dev Dependencies">
  </a>
  <a href="https://www.bithound.io/github/mazhlekov/tsc-resolve">
    <img src="https://www.bithound.io/github/mazhlekov/tsc-resolve/badges/code.svg" alt="bitHound Code">
  </a>
  <a href="https://www.bithound.io/github/mazhlekov/tsc-resolve">
    <img src="https://www.bithound.io/github/mazhlekov/tsc-resolve/badges/score.svg" alt="bitHound Overall Score">
  </a>
  <br/>
  <a href="https://github.com/mazhlekov/tsc-resolve/blob/master/LICENSE">
    <img
      alt="license:mit"
      src="https://img.shields.io/github/license/mazhlekov/tsc-resolve.svg?style=flat-square"
    />
  </a>
  <a href="https://npmjs.com/package/tsc-resolve">
      <img src="https://img.shields.io/npm/dm/tsc-resolve.svg?style=flat-square">
  </a>
  <br/>
  <a href="https://tsc-resolve.slack.com/">
    <img
      alt="Join the Slack chat"
      src="https://img.shields.io/badge/slack-join%20chat-E2206F.svg?style=flat-square"
    />
  </a>
  <a href="https://gitter.im/tsc-resolve">
    <img
      alt="Join the Gitter chat"
      src="https://img.shields.io/badge/gitter-join%20chat-D0104D.svg?style=flat-square"
    />
  </a>
</p>

## Why tsc-resolve?
<a href="https://asciinema.org/a/123305" target="_blank">
    <img src="https://github.com/mazhlekov/tsc-resolve/raw/master/img/tsc-resolve.gif" />
</a>

## Installation
```bash
# Local package
$ npm i timephy/tsc-resolve-fix --save-dev

# Global CLI
$ npm i -g timephy/tsc-resolve-fix 
```

## Usage
### NPM task
```bash
$ npm i tsc-resolve --save-dev

"scripts": {
    "compile": "tsc",
    "build": "compile && tsc-resolve"
}

$ npm run build
```
### CLI
```bash
$ npm i -g timephy/tsc-resolve-fix

$ ./node_module/.bin/tsc-resolve
$ tsc-resolve
$ tsc-resolve -p tsconfig.prod.json
$ tsc-resolve -p ./conf/tsconfig.dev.json
$ tsc-resolve -p ./conf/
$ tsc-resolve -p ../
```
    
### TypeScript
```typescript
import { tscResolve } from "tsc-resolve"
import * as path from "path"

// Simple ./tsconfig.json
const configPath = process.cwd();
tscResolve(configPath)
    .then(() => { /*DONE*/ });

// Specific tsconfig.json
const configPath = path.join(process.cwd(), "tsconfig.prod.json");
tscResolve(configPath)
    .then(() => { /*DONE*/ });

// Specific tsconfig.json in different folder
const configPath = path.resolve(process.cwd(), "../conf/tsconfig.dev.json");
tscResolve(configPath)
    .then(() => { /*DONE*/ });

// Async/Await
const configPath = process.cwd();
await tscResolve(configPath);
```

### JavaScript
```javascript
const tscResolver = require("tsc-resolve");
const path = require("path");

// Simple ./tsconfig.json
const configPath = process.cwd();
tscResolve(configPath)
    .then(() => { /*DONE*/ });

// Specific tsconfig.json
const configPath = path.join(process.cwd(), "tsconfig.prod.json");
tscResolve(configPath)
    .then(() => { /*DONE*/ });

// Specific tsconfig.json in different folder
const configPath = path.resolve(process.cwd(), "../conf/tsconfig.dev.json");
tscResolve(configPath)
    .then(() => { /*DONE*/ });

// Async/Await
const configPath = process.cwd();
await tscResolve(configPath);
```
