'use strict';

/*
Developer: Israel Flores (www.github.com/idflores)

File Name: statusCodes.js

Purpose: defines the http reponses given by the Twitch server

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
  Developed using the following as reference:
    RFC1459 Handbook: https://tools.ietf.org/html/rfc1459.html
    IRC Numerics: https://www.alien.net.au/irc/irc2numerics.html

  Use those references to find other status codes that are not listed here
*/

// Updated: 8 May 2017
module.exports = {
  '001': {
    name: 'rpl_welcome',
    type: 'reply',
    desc: 'Twitch server welcome'
  },
  '002': {
    name: 'rpl_yourhost',
    type: 'reply',
    desc: 'identifies the current host with it\'s server name such as \
          \"tmi.twitch.tv\" as well as its version, if applicable'
  },
  '003': {
    name: 'rpl_created',
    type: 'reply',
    desc: 'shows when the Twitch server was created'
  },
  '004': {
    name: 'rpl_myinfo',
    type: 'reply',
    desc: 'shows the server\'s information, but is currently blank on Twitch'
  },
  '353': {
    name: 'rpl_namreply',
    type: 'reply',
    desc: 'a list of channels or usernames depending on the request; ended by \
          code \'366\''
  },
  '366': {
    name: 'rpl_endofnames',
    type: 'reply',
    desc: 'a placeholder to signal the END of a list of names given by \
          code \'353\''
  },
  '372': {
    name: 'rpl_motd',
    type: 'reply',
    desc: 'shows the Twitch server\'s Message Of The Day'
  },
  '375': {
    name: 'rpl_motdstart',
    type: 'reply',
    desc: 'a placeholder to signal the START of the Message Of The Day \
          given by code \'372\' and ended by code \'376\'; usually blank'
  },
  '376': {
    name: 'rpl_endofmotd',
    type: 'reply',
    desc: 'a placeholder to signal the END of the Message Of The Day; \
          started by code \'375\' and given by code \'372\'; usually blank'
  },
  '421': {
    name: 'err_unknowncommand',
    type: 'error',
    desc: 'signals that the Twitch server received an unknown command and \
          usually shows the attempted command received'
  }
};