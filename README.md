# changelog-emoji

Generate changelog

## Install

```bash
yarn add changelog-emoji -g
# or
npm install changelog-emoji -g
```

## Usage

```
npx changelog
```

You can use it with [standard-version](https://github.com/conventional-changelog/standard-version),
Config in `package.json`.
```json
"script": {
  "release": "standard-version"
},
"standard-version": {
  "skip": {
    "changelog": true
  },
  "scripts": {
    "postbump": "yarn changelog
  }
}
```
