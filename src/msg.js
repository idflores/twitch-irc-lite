/*
Developer: Israel Flores (www.github.com/idflores)

File Name: msg.js

Purpose: defines a `msg` object used for server responses

**Code.written() with <3 in Babel**


LICENSE:

This file is part of Twitch-IRC.

Twitch-IRC is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Twitch-IRC is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
  Twitch IRC Server Response Schema
  @descriptoin: based on the host, the Twitch IRC server will respond in the
                following organization

  Host: tmi.twitch.tv
  <meta> :<meta_host>.<host> <status> <user> <tag> #<channel> :<message>

  Host: jtv
  :<host> <tag> #<channel> <jtv_action> <user>
*/

/*
  @object: msg
  @description: a prototype to maintain the evaluated details
                of one line of parsed `rawData`

    @property: raw
    @description: `String` of *one* line recieved from the server

    @property: meta
    @description: anything that is recieved before the hostName

    @property: meta_host
    @description: the header to the `host` carrying the name of the user
                  calling the server
                  useful especially in `PRIVMSG` since it designates who the
                  `PRIVMSG` is **from**

    @property: host
    @description: in every recieved message, the host name will ALWAYS be
                  included. We're using it as the anchor to how `serverResponse`
                  parses the recieved message

    @property: status
    @description: HTTP status code if any are applicable

    @property: user
    @description: carries the user the **server** is addressing NOT a user

    @property: tag
    @description: when a command is sent to the server, the server will
                  respond with an echo of the command sent ...or `tag`

    @property: channel
    @description: the channel name associated with the message recieved

    @property: message
    @description: the parsed information recieved by the server

    @property: jtv_action
    @description: supports the legacy jtv mod/unmod actions
                  Will, normally, only have two values:

                    +o   - or -   -o

    @property: error
    @description: if `twitch-irc` encounters an error parsing the message,
                  it's `raw` will be filled with the response from the server,
                  and an error message from `twitch-irc` will populate here
*/
module.exports = class Msg {
  /*
    @function: constructor()
    @description: intializes all properties of the Msg object
  */
  constructor() {
    this.raw;
    this.meta;
    this.meta_host;
    this.host;
    this.status;
    this.user;
    this.tag;
    this.channel;
    this.message;
    this.jtv_action;
    this.error;
  }
}
