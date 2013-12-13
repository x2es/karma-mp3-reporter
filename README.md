# karma-mp3-reporter

> Report overall tests results using mp3 files.

## NOTE

This module in development and not published to npm yet.
Also its dependency has unresolved but isolated issue.

## Motivation

While I am expecting suceess for all tests I don't want to switch attention to tests result on each file saving.
In some cases I want to hear light green-signal about success, but it not so important.
But if I broked something I'd like to pay attention.

## Installation

The easiest way is to keep `karma-mp3-reporter` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-mp3-reporter": "https://github.com/x2es/karma-mp3-reporter/tarball/master"
  }
}
```

You can simple do it by:
```bash
npm install karma-mp3-reporter --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    reporters: ['progress', 'mp3'],

    // this section and all options is optional
    mp3Reporter: {
      red:        '/path/to/red.mp3',         // in case of 'fail' or 'error'
      green:      '/path/to/green.mp3',       // in case of 'success'

      // following options will override 'red'/'green' options behaviour
      fail:       '/path/to/fail.mp3',
      error:      '/path/to/error.mp3',
      success:    '/path/to/success.mp3',
    }
  });
};
```

You can pass list of reporters as a CLI argument too:
```bash
karma start --reporters mp3,dots
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
