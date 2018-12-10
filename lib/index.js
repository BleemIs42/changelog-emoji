"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const conventionalChangelogCore = require("conventional-changelog-core");
const fs_1 = require("fs");
const getStream = require("get-stream");
const path_1 = require("path");
const constants_1 = require("./constants");
const getExitChangelog = () => {
    const changelogPath = path_1.join(process.cwd(), 'CHANGELOG.md');
    const changelogFile = fs_1.readFileSync(changelogPath, { encoding: 'utf8', flag: 'a+' });
    const changelogContent = changelogFile.split(constants_1.CHANGELOG_HEADER)[1] || changelogFile;
    return [changelogPath, changelogContent];
};
const generateChangelog = () => __awaiter(this, void 0, void 0, function* () {
    const changelogStream = conventionalChangelogCore({
        config: Object.assign({}, require('cz-commit-emoji'))
    });
    const newLog = yield getStream(changelogStream);
    const [changelogPath, changelogContent] = getExitChangelog();
    if (changelogContent.indexOf(newLog) !== -1) {
        return;
    }
    const newFile = [constants_1.CHANGELOG_HEADER, newLog, changelogContent].join(constants_1.BLANK_LINE);
    fs_1.writeFileSync(changelogPath, newFile, { encoding: 'utf8' });
});
generateChangelog();
