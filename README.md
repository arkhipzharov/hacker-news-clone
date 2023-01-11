# Hacker news clone

This is a [pet project](http://lime-test.h1n.ru/hacker-news-clone) trying to
be like [hacker-news.news](https://www.hacker-news.news) which is using hacker
news api introduced by [ycombinator](https://news.ycombinator.com). Main
features is that all edge cases except connection interrupt in data loading is
covered and you can safely return to previous pages and continue exploring
content

## 📥 Setup

1. `git clone https://github.com/arkhipzharov/hacker-news-clone`
2. `npm install`

> Type checking for all files except unit tests is launched along with commands
> `npm run build` and `npm run dev`

## 👷‍♂ Development

`npm run dev`

## 🌐 Production

1. `npm run build`
2. Upload files from dist folder on hosting

## ✅ Run unit tests

> With the vscode-jest extension (version 3.0.2), tests can automatically run
> on startup, or `ctrl+shift+p` on windows > `Jest: Start Runner`, but do not forget to set the jest.disabledWorkspaceFolders option
> if you work in multi-root workspace

`npm run test`

## 🛡️ Type checking for unit tests

- Run default vscode build task with `ctrl+shift+b`, or `ctrl+shift+p` > `Tasks: Run Task` > `unit tests type checking`

  Or

- `npm run types`

## Other

- If you meet problems refreshing globally imported scss files or svg sprite cache reload webpack
- Files for debugging are in `.` folder inside chrome dev tools
