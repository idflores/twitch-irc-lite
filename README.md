[![Node Version](https://img.shields.io/badge/npm-1.0.0-blue.svg?style=flat-square)]()

<h1 align="center">Twitch-IRC-Lite</h1>

**Disclaimer:** [Twitch](https://www.twitch.tv) is a trademark or registered trademark of [Twitch Interactive, Inc.](https://www.twitch.tv) in the U.S. and/or other countries. "Twitch-IRC-Lite" is not operated by, sponsored by, or affiliated with [Twitch Interactive, Inc.](https://www.twitch.tv) in any way.

<h2 align="center">Motivation</h2>

I've been developing a [Twitch chat bot](https://github.com/idflores/the-hunter) for a streamer that I mod. The popular IRC package available from `npm` (not naming any names...), although excellent, I found difficult to work with. It's dependency on `node-gyp` and `iconv` presented incompatibility issues with [`webpack`](https://github.com/webpack/webpack) and [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server).

There are other options, but I found them to be either incomplete or complete overkill for my application. So, I chose to make my own [Twitch.tv](https://www.twitch.tv) dedicated IRC package that I could share with all of you!

### Features

Twitch-IRC-Lite is a **_simple_**, **_lightweight_** Twitch IRC package,

+ compatible with module bundlers like [`webpack`](https://github.com/webpack/webpack),

+ already minified for browser applications,

+ has **no** dependencies,

+ and only takes 2 lines of code to [get started](#getting-started).

Most useful of all, Twitch-IRC-Lite returns already parsed `Object` representations of **all** Twitch server responses!

<h2 align="center">Install <sub>(under construction)</sub></h2>

```bash
npm install --save twitch-irc-lite
```

<h2 align="center">Getting Started</h2>

```JavaScript
// connect to Twitch
var myChatBot = new IRC('oauth:samplew49fu0sve908gjsample', 'aGreatUserName')

// join a channel
myChatBot.join('anAwesomeChannel')

// get live chat messages to your application
myChatBot.chatEvents.addListener('message', function(channel, from, message){
  /* your code here */
});

// THAT's IT!
```

<h2 align="center">Usage</h2>

### Connect to Twitch

```JavaScript
var myChatBot = new IRC(oauth, username);
/*
 Example:
 var myChatBot = new IRC('oauth:example23ewuojv309ujfexample', 'myusername');
*/
```
*Note: You can get your `oauth` key at [Twitch Authentication Docs](https://dev.twitch.tv/docs/v5/guides/authentication/)*

### Join a Channel

```JavaScript
myChatBot.join(channel);
```
*Note: Twitch-IRC supports joining multiple channels concurrently*

### Send a Chat Message

```JavaScript
myChatBot.chat(message, channel);

/*
  DEFAULT: channel = null
    if channel is omitted, chat() will default to the last channel joined
*/
myChatBot.chat(message);
```

### List Joined channels

```JavaScript
/*
  returns a list of joined channels & outputs them to the console
*/
var myChannels = myChatBot.getChannels()
```

### Leave a Channel

```JavaScript
myChatBot.leave(channel);

/*
  DEFAULT: channel = null
    if channel is omitted, leave() will default to the last channel joined
*/
myChatBot.leave();
```

### Get *Live* Chat Messages

```JavaScript
myChatBot.chatEvents.addListener('message', function(channel, from, message){

  /* your code here

      *channel*  String of the current channel
      *from*     String of the sending username
      *message*  String of the chat message received

     your code here */

});
```

If your IRC instance is in `Debug_Mode`, you will get a `Msg` object with a parsed Twitch server response.
Check the code comments in `/src/msg.js` for more information.

```JavaScript
myChatBot.chatEvents.addListener('message', function(Msg_Object) {
  /* your code here */
})
```

### Chat Message History

When called outputs a chat history to the console and returns the chat history as an array.

If set to `true`, `Verbose` will return & output **all** `Msg` objects received from the server.

```JavaScript
var myHistory = myChatBot.getChatHistory(verbose)

/*
  DEFAULT: verbose = false
    if verbose is omitted, getChatHistory() will default to only Twitch PRIVMSGs
*/
var myHistory = myChatBot.getChatHistory()
```

If `false` or omitted, will return a `String` array of only chat history (or Twitch PRIVMSGs) like this:

```bash
[AGreatChannel] imAUser: this is a sample chat message :)
```

<h2 align="center">Development Notes</h2>

### Purpose & Design

This package aims only to provide IRC communication between Twitch servers and your application following Twitch's [Chat and IRC](https://dev.twitch.tv/docs/v5/guides/irc/) development guidelines. No automatic Twitch commands or similar are implemented here. That's a job for your bot ;)

It should also be said, again, that this IRC package is meant specifically for [Twitch.tv](https://www.twitch.tv) using the [IRC Protocol (RCF1459)](https://tools.ietf.org/html/rfc1459.html) as defined by the [Twitch Development Site](https://dev.twitch.tv/docs/v5/guides/irc/). Twitch-IRC-Lite is not meant for other IRC applications. You've been warned. :P

### File Structure & Implementation

`/build` is the compiled and minified JavaScript library for general use.

`/src` is the main development library. It's written in [Babel](https://babeljs.io) and is *not* included in `npm install`.

I spent a lot of time commenting my code well. If you have any questions, **please** check the code comments in `/src` before you post an issue <3

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

<h2 align="center">Future Development</h2>

### Version 2.0

+ [ ] Support [Twitch-Specific IRC Capabilities](https://dev.twitch.tv/docs/v5/guides/irc/#twitch-specific-irc-capabilities)

### Ongoing

+ [ ] Offer more debug logging based on HTTP status codes

<h2 align="center">Suggestions?</h2>

If you have any suggestions on how to make this library better, go ahead and open an issue. I'd love to hear from you :)
