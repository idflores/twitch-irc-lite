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

module.exports = class Msg {
  /*
    @function: constructor()
    @description: intializes all properties of the Msg object
  */
  constructor() {
    this.raw,
    this.meta,
    this.meta_host,
    this.host,
    this.status,
    this.user,
    this.cmd,
    this.channel,
    this.message,
    this.jtv_action
  }
}
