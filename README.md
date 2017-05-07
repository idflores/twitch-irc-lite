<h1 align="center">Twitch IRC</h1>

<h2 align="center">Motivation</h2>

Twitch-IRC aims to be a simple & lightweight IRC package. I've been developing a [Twitch chat bot](https://github.com/idflores/the-hunter) for a streamer that I mod. The popular IRC package available from `npm` (not naming any names...), although excellent, I found difficult to work with.

Specifically, I needed a package that would work well with [`webpack`](https://github.com/webpack/webpack) and [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server). The dependency of the popular `npm` IRC package on `node-gyp` and `iconv` made it very difficult to integrate with my project.

There was one more alternative (again, not naming any names...). But, I *personally* found it to be poorly written, and it didn't seem to have robust console logging like the popular `npm` IRC project did.

While there may be other options, I chose to make my own [Twitch.tv](https://www.twitch.tv) dedicated IRC package that I could share with all of you!

To stay modular, this package will have **no** dependencies except for [`node.js`](https://nodejs.org/en/). That way, we can apply this package `webpack`, Twitch bots, and many other `node.js` projects.

In addition, this package aims only to provide communication between Twitch servers and your application following the "Chat and IRC" development guidelines listed on [dev.twitch.tv](https://dev.twitch.tv/docs/v5/guides/irc/). No automatic twitch commands or similar will be implemented here. That's a job for your bot ;)

It should also be said, again, that this IRC package is meant specifically for [Twitch.tv](https://www.twitch.tv). If you try to use this package for other IRC applications, *you do so at your own risk*. You've been warned. :P

<h2 align="center">Install <sub>(under construction)</sub></h2>

```bash
npm install --save twitch-irc
```

<h2 align="center">Usage</h2>

some profound text here ;)

<h2 align="center">Personal Notes</h2>

### Commands

```bash
npm run dev
```

`dev` command configured in `package.json` to "hot" compile all `/lib` directory [Babel](https://babeljs.io) files to the `/build` directory when changes are made and saved

```bash
npm run build
```

`build` command configured in `package.json` to compile the `/lib` directory to `/build` **without** "hot" compiling

### Development Environment <sub>6 May 2017</sub>

+ [Atom.io](https://atom.io) v1.16.0
+ [Babel](https://babeljs.io)
  + [bable-cli](https://github.com/babel/babel/tree/master/packages/babel-cli) v6.24.1
  + [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core) v6.24.1
  + [babel-preset-env](https://github.com/babel/babel-preset-env) v1.4.0
+ [Node.js](https://nodejs.org) v6.10.2
