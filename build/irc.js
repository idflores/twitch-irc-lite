'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
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


var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _msg = require('./msg.js');

var _msg2 = _interopRequireDefault(_msg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// @personal-note:
//  Using module.exports to make the class publicly available following:
//  http://stackoverflow.com/questions/33505992/babel-6-changes-how-it-exports-default
module.exports = function () {
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

    // initialize an array property to keep a server response history
    var history = this.history = [];

    // establish a connection Socket to the Twitch IRC server
    var client = this.client = _net2.default.connect(6667, 'irc.chat.twitch.tv');
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
      if (debug_mode) console.log(message.toString());else serverResponse(message, history, client);
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

  /*
    @function: join()
    @description: joins a twitch chat channel
       @param: channel
      @description: takes the channel name desired
  */


  _createClass(IRC, [{
    key: 'join',
    value: function join(channel) {
      this.client.write('JOIN #' + channel + '\r\n');
    } // END join()

    /*
      @function: getHistory()
      @description: returns history of all server messages
       // TODO: getChatHistory()
      Note: use getChatHistory() for outputing only a chat message log
    */

  }, {
    key: 'getHistory',
    value: function getHistory() {
      var debug_mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


      // outputs debug history including each `Msg` object
      if (this.debug_mode || debug_mode) {
        console.log(this.history);
      }

      // outputs only `Msg.messages`
      else {
          for (var i = 0; i < this.history.length; i++) {
            if (this.history[i].message !== undefined) {
              console.log(this.history[i].message);
            }
          }
        } // END IF
    } // END getHistory()

  }]);

  return IRC;
}(); // END Class


// IRC CLASS TOOLS //
/*
  Babel/EC6 does not support a Babel function to be called in the `callback`
    EventEmitter.addListener(<event>, <callback>) function. As a result, some
    utility functions must be declared outside the IRC class. :/
*/

/*
  @function: serverResponse(message)
  @description: handles responses from the Twitch Server

    @param: rawData
    @description: the data `Buffer` object given by the `net` Socket
                  instantiated in the IRC constructor

    @param: history
    @description: reference to the server messages `history` array in `IRC`

    @param: client
    @description: the current `net` socket connection to Twitch

  Notes: Great resource when developing the parsing algorithm
         String: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
         RegExp: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
*/
function serverResponse(rawData, history, client) {
  /*
    Schema: the `Buffer` given by the `Socket` can carry multiple lines of
            data. The following code is structured into the following manner:
               `rawData` is the `String` representation of the `Buffer` data
              recieved from the server. It is split into `Msg` objects and
              stored in `history`
               `history` is a limited, growing array of `Msg` objects
               `Msg` is excately *one* line recieved from the Twitch server
              and includes parsed details (see msg.js for more information)
             The process models the following:
               (1) rawData >> Msg : separate the rawData into actual lines
                                   recieved from the server
               (2) Msg >> history : store `Msg` objects as an array of
                                        lines recieved from the server
  */

  // convert the server response to a `Buffer` object
  rawData = rawData.toString();

  // initialize the `RegExp` for the host name anchor
  var twitchExp = new RegExp(/tmi\.twitch\.tv/);
  var jtvExp = new RegExp(/:jtv/);

  // Loop: splits 'rawData' into single lines of code and parses them
  while (rawData.search(/\r\n/) !== -1) {

    // initialize index to track the current server response in our `history`
    var endIndex = null;
    var colonIndex = null;
    var channelIndex = null;
    var spaceIndex = null;
    var hostIndex = null;

    // SPLIT //

    // Searches for the first instance of the `\r\n` line delimitter and
    // and stores a single line recieved from the server in `Msg.raw`
    endIndex = rawData.search(/\r\n/);
    history.push(new _msg2.default());

    var index = history.length - 1;
    history[index].raw = rawData.substring(0, endIndex);

    // since the first line has been stored, remove that line from the
    // rawData to prepare for evaluating the next line
    rawData = rawData.substring(endIndex + 2);

    // PARSE //

    try {
      // handle `tmi.twich.tv` messages
      if (history[index].raw.search(twitchExp) !== -1) {

        // making a copy of `Msg.raw` so we can delete portions as we parse
        var temp = history[index].raw;

        // initialize parse utility indexes
        hostIndex = temp.search(twitchExp);
        colonIndex = temp.search(/:/);

        // check and answer `PING` messages from the server
        if (temp.search(/PING/) !== -1) {
          history[index].host = 'tmi.twitch.tv';
          history[index].tag = 'PING';
          client.write('PONG :tmi.twitch.tv \r\n');
          continue;
        } // END "ping" IF

        // get `Msg.meta`
        if (colonIndex !== 0) {
          history[index].meta = temp.substring(0, colonIndex);
          temp = temp.substring(colonIndex);
        }

        // get `Msg.meta_host`
        if (hostIndex - colonIndex !== 1) {
          history[index].meta_host = temp.substring(colonIndex + 1, hostIndex - 1);
          temp = temp.substring(hostIndex - 1);
          hostIndex = 1;
        }

        // get `Msg.host`
        history[index].host = temp.match(twitchExp).toString();
        temp = temp.substring(hostIndex + 14);

        // get `Msg.message`
        // getting rid of the message will make it easier to evaluate later
        if (temp.search(/:/) !== -1) {
          colonIndex = temp.search(/:/);
          history[index].message = temp.substring(colonIndex + 1);
          temp = temp.substring(0, colonIndex - 1);
        }

        // get `Msg.channel`
        if (temp.search(/#/) !== -1) {
          channelIndex = temp.search(/#/);
          history[index].channel = temp.substring(channelIndex + 1);
          temp = temp.substring(0, channelIndex - 1);
        }

        // get `Msg.status`
        if (!isNaN(temp.substring(0, 3))) {
          history[index].status = temp.substring(0, 3);
          temp = temp.substring(4);
        }

        // get `Msg.user`
        // there will never be an IRC command less than 3 uppercase characters
        if (temp.substring(0, 3) !== temp.substring(0, 3).toUpperCase()) {
          spaceIndex = temp.search(' ');

          // a space denotes a command exists
          if (spaceIndex !== -1) {
            history[index].user = temp.substring(0, spaceIndex);
            temp = temp.substring(spaceIndex + 1);
          } else {
            history[index].user = temp;
            temp = null;
          }
        }

        // get `Msg.tag`
        // the command is the only thing left at this point
        if (temp !== null) {
          history[index].tag = temp;
        }
      }

      // handle `jtv` messages
      else if (history[index].raw.search(jtvExp) !== -1) {
          // currently, there is only *one* case that the legacy jtv server is
          // still used --> channel mod/unmod member

          var _temp = history[index].raw.split(' ');
          history[index].host = _temp[0].substring(1);
          history[index].tag = _temp[1];
          history[index].channel = _temp[2].substring(1);
          history[index].jtv_action = _temp[3];
          history[index].user = _temp[4];
        }

        // currently, no support for other Twitch IRC server hosts
        // ...if they exists.
        else {
            throw "ERROR: Cannot identify the host!";
          }
    } catch (e) {
      history[index].error = e;
      console.log(history[index].error);
      continue;
    } // END try/catch

    // console.log(history[index])
  } // END WHILE
} // END serverResponse()