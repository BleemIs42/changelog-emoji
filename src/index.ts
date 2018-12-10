import * as conventionalChangelogCore from 'conventional-changelog-core'
import { readFileSync, writeFileSync } from 'fs'
import * as getStream from 'get-stream'
import { join } from 'path'
import { BLANK_LINE, CHANGELOG_HEADER } from './constants'

const getExitChangelog = () => {
  const changelogPath = join(process.cwd(), 'CHANGELOG.md')
  const changelogFile = readFileSync(changelogPath, { encoding: 'utf8', flag: 'a+' })
  const changelogContent = changelogFile.split(CHANGELOG_HEADER)[1] || changelogFile
  return [changelogPath, changelogContent]
}

const generateChangelog = async () => {
  const changelogStream = conventionalChangelogCore({
    config: {
      ...require('cz-commit-emoji')
    }
  })
  const newLog = await getStream(changelogStream)
  const [changelogPath, changelogContent] = getExitChangelog()
  
  if (changelogContent.indexOf(newLog) !== -1) {
    return
  }
  
  const newFile = [CHANGELOG_HEADER, newLog, changelogContent].join(BLANK_LINE)
  writeFileSync(changelogPath, newFile, { encoding: 'utf8' })
}

generateChangelog()

