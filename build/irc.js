'use strict';

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _clone = require('./clone.js');

var _clone2 = _interopRequireDefault(_clone);

var _msg = require('./msg.js');

var _msg2 = _interopRequireDefault(_msg);

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

    @param: rawData
    @description: the data `Buffer` object given by the `net` Socket
                  instantiated in the IRC constructor

  Notes: Great resource when developing the parsing algorithm
          String: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
          RegExp: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
*/
function serverResponse(rawData) {
  /*
    Schema: the `Buffer` given by the `Socket` can carry multiple lines of
            data. The following code is structured into the following manner:
               `rawData` is the `String` representation of the `Buffer` data
              recieved from the server. It is split into a `data` array
               `data` is an array of `msg` objects
               `msg` is excately *one* line recieved from the Twitch server
              and includes parsed details
             The process models the following:
               (1) rawData >> data : separate the rawData into actual lines
                                    recieved from the server and store them
                                    as an array of lines called `data`
               (2) data >> msg : each line (or `data` index) is then parsed
                                (or decoded) to become a `msg` object
  */

  // make sure the message is a `String` and not a `Buffer` object
  rawData = rawData.toString();

  /*
    @array: data
    @description: an array of each line of `rawData`
  */
  var data = [];

  /*
    @object: msg
    @description: a prototype to maintain the evaluated details
                  of one line of parsed `rawData`
       @property: raw
      @description: `String` of *one* line recieved from the server
       @property: header
      @description: anything that is recieved before the hostName
       @property: hostName
      @description: in every recieved message, the host name will ALWAYS be
                    included. We're using it as the anchor to how we parse
                    the recieved message
       @property: status
      @description: HTTP status code if any are applicable
       @property: message
      @description: the parsed information recieved by the server
  */
  var msg = {
    raw: null,
    header: null,
    hostName: null,
    status: null,
    message: null
  };

  // copy the `rawData` so we can manipulate it and still keep the original
  var temp = rawData;
  // initialize an index to track our `temp` evaluation
  var endIndex = null;
  // initialize the `RegExp` for the host name anchor
  var hostExp = new RegExp(/:[\w.]*\.twitch\.tv/);
  // initialize an index to track the `hostName`
  var hostIndex = null;

  // Loop: splits 'rawData' into single lines of code and parses them
  for (var i = 0; temp.search(/\r\n/) !== -1; i++) {

    // SPLIT //
    // Note: could have used String.split(), but with little advantage

    // Searches for every instance of the `\r\n` line delimitter
    endIndex = temp.search(/\r\n/);
    // When found it `Clone`s a new `msg` Object into the `data` array
    data[i] = new _clone2.default(msg);
    //  A single line of `rawData` is stored in `raw` for evaluation
    data[i].raw = temp.substring(0, endIndex);
    temp = temp.substring(endIndex + 2);

    // PARSE //

    // msg.hostName:
    // get the `hostName` from the `raw` server response
    // TODO: try/catch, throw error/warning if hostname does not exist
    data[i].hostName = data[i].raw.match(hostExp).toString();
    hostIndex = data[i].raw.search(hostExp);

    // msg.header:
    // get the header (the portion before the `hostName`), if it exists
    // it carries usernames, channel names, etc.
    if (hostIndex !== 0) {
      data[i].header = data[i].raw.substring(0, hostIndex);
    }

    // msg.status
    // get and handle the HTTP status code if it exists
  }
  console.log(data);
  //
  //
  // msg.message = rawData.substring(hostIndex + msg.hostName.length)
  // console.log(msg)
}