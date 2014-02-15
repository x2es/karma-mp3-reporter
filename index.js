var Player = require('player');
var path = require('path');

// mp3 reporter class
// @param config: available opts is 'red', 'green', 'fail', 'error', 'success'
var Mp3Reporter = function(config) {

  var soundDir = path.join(__dirname, 'sound');

  // default configuration
  var cfg = {
    red:   path.join(soundDir, 'airplane-alert.mp3'),
    green: path.join(soundDir, 'lite-bounce.mp3')
  }

  // merge config over defaults
  for (var opt in config) if (config.hasOwnProperty(opt)) {
    cfg[opt] = config[opt];
  };


  // fallbacks scheme:
  // -------------------------------
  // fail    --> | red    --> | NULL
  // error   --> |            |
  //                          |
  // success --> | green  --> |
  // -------------------------------
  var fallbacks = {
    fail:          'red',
    error:         'red',
    success:       'green'
    // red:        null,
    // green:      null,
  }

  // @see issue below
  // var playersCache = {};

  // smart source chooser & player
  var play = function(what) {
    var target = what;
    while (target != undefined) {   // looking for target or its fallback
      if (cfg[target] != undefined) break;
      target = fallbacks[target];
    }
    if (target == undefined || cfg[target] == undefined) return;

    // ISSUE:x2es: it should be as following lines
    //             but npm player has memory leaks and may not be cached
    //             commented until solving memory leaks / changing playing library
    // if (playersCache[target] == undefined) playersCache[target] = new Player(cfg[target]);
    // playersCache[target].play();

    var p = new Player(cfg[target]);
    p.play();
  }

  this.onBrowserComplete = function(browser) {
    // tip about browser (sample data)
    // browser: {
    //   lastResult: { 
    //     success: 24,
    //     failed: 0,
    //     skipped: 0,
    //     total: 24,
    //     totalTime: 616,
    //     netTime: 14,
    //     error: false,
    //     disconnected: false,
    //     totalTimeEnd: [Function] 
    //   },
    // }

    var r = browser.lastResult;
    if (r.error)            play('error');
    else if (r.failed > 0)  play('fail');
    else                    play('success');
  }
}

Mp3Reporter.$inject = ['config.mp3Reporter'];

module.exports = {
  'reporter:mp3': ['type', Mp3Reporter]
};

