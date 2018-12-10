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
changelog
```

You can use it with [standard-version](https://github.com/conventional-changelog/standard-version),
Config in `package.json`.
```json
"script": {
  "release": "standard-version && changelog"
},
"standard-version": {
  "skip": {
    "changelog": true
  }
}
```
