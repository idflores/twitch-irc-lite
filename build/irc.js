'use strict';

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                          Developer: Israel Flores (www.github.com/idflores)
                                                                                                                                                          
                                                                                                                                                          File Name: irc.js
                                                                                                                                                          
                                                                                                                                                          Purpose: defines the main IRC class and functionality
                                                                                                                                                          
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

// calls the node.js `net` library for TCP/IP communication


// calls the node.js `EventEmitter` library to support emitted events from `net`
//import Event from 'events'

// @personal-note:
//  Using module.exports to make the class publicly available following:
//  http://stackoverflow.com/questions/33505992/babel-6-changes-how-it-exports-default
module.exports =
/*
  @function: constructor(oauth, username, debug_mode <false>)
  @description: Makes an instance of the IRC client
     @param: oauth
    @description: an alphaNumeric key given by Twitch.tv here
                  https://dev.twitch.tv/docs/v5/guides/authentication/
     @param: username
    @description: **your** Twitch username
     @param: debug_mode
    @default: false
    @description: pass `true` if you desire to view _everything_ the Twitch
                  IRC server responds in the console;
                  `false` will cause only chat messages to output to
                  the console
*/
function IRC(oauth, username) {
  var debug_mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  _classCallCheck(this, IRC);

  // establish a connection Socket to the Twitch IRC server
  var client = _net2.default.connect(6667, 'irc.chat.twitch.tv');
  // sets the output protocol for the 'net' Socket buffer that holds data
  // whenever the Twitch server responds
  client.setEncoding('utf8');

  // LISTENERS //

  // @listener: 'connect'
  // @description: listening for successful `connect` event emitted by
  //               the `net` Socket
  client.addListener('connect', function () {

    // authenticate this IRC client with the Twitch IRC server
    client.write('PASS ' + oauth + '\r\n');
    client.write('NICK ' + username.toLowerCase() + '\r\n');

    // @console: debug connection
    if (debug_mode) {
      console.log('Established connection');
      console.log(client.address());
    } else console.log('You\'re connected!');
  });

  // @listener: 'data'
  // @description: listens for `data` event emitted by the `net` Socket
  //               and outputs the data recieved from the Socket buffer
  client.addListener('data', function (message) {
    if (debug_mode) console.log(message.toString());else serverResponse(message);
  });

  // @listener: 'error'
  // @description: listening for failed connection attempt and any other
  //               errors emitted by the `net` Socket
  client.addListener('error', function (exception) {

    if (debug_mode) {
      console.log('Failed connection');
      console.log(exception.toString());
    } else console.log('ERROR: Connection failed. Check your username \
                       and password');
  });

  // @listener: 'end'
  // @description: listening for the `end` event from the `net` Socket
  //               when the Twitch server has disconnected
  client.addListener('end', function () {
    console.log('You have disconnected.');
  });
} // END Constructor
; // END Class


// IRC CLASS TOOLS //
/*
  @function: serverResponse(message)
  @description: handles responses from the Twitch Server

    @param: message
    @description: the data `Buffer` object given by the `net` Socket
                  instantiated in the IRC constructor
*/
function serverResponse(message) {
  // @TODO: handle server responses
  console.log(message.toString());
}