A bunch of real-life CSS and their HTML for testing CSS transform tools

    Lashing out the action, returning the reaction
    Weak are ripped and torn away
    Hypnotizing power, crushing all that cower
    Battery is here to stay

    ~ Metallica, Battery

## Why

Tools. Transpilers. Pre/post processors. Testing. How do you know what you've done works?

## Installation

    $ npm install csstestbattery

## Usage

    Crushing all deceivers, mashing non-believers
    Never ending potency

    ~ Metallica, Battery


First you run your transforms, reading from `/before` dirs and writing to `/after`. Then:

```js
var obsession = require('csstestbattery');
obsession.assert();
```

The tests assertions will be run using the CSSDiff project

### Help finding CSS files to transform

If you need a little help when running your transforms, try the `getLocations()` method.
It gives you an array of before/after locations. E.g.

``` javascript
var insanity = require('csstestbattery');
var loco = insanity.getLocations();
loco.forEach(function(l) {
  console.log(l.before);
  console.log(l.after);
  
  // your transform l.before -> l.after goeth here
});

// all done? Check

insanity.assert();
```

See also `/examples/mensch.js` for an example of a real transform (prettification with the Mensch parser)
followed by a check.

## Contribute

### Libs

If you see a nice CSS library that should be added to the battery of tests, follow these steps:

 * Take an HTML file that uses the library (preferably as extensively as possible) and copy it to
  `/data/libraries/html`, e.g. `/data/libraries/html/bootstrap.html`
 * Take a CSS with the same filename and copy to 
   `/data/libraries/before`, e.g. `/data/libraries/html/bootstrap.css`

No images, fonts, etc, just CSS and HTML. Also strip any `<link>`, `<style>` and `<script>` tags, although these will
likely be stripped by the test runner.

### CSSZenGarden

If CSSZenGarden's files need an update, run

  $ node scripts/zengarden.js

### Alexa top 100

If you want to update the Alexa top 1000 sites, first grab a fresh copy of the list from http://httparchive.org/urls.php, copy to `/scripts/alexa1000.txt`. Then run

  $ node scripts/alexa.js
  
Give it a minute. You'll also need `phantomjs` somewhere in your path.

## License

This is a public domain project. All yours.

It contains files downloaded from "the wild" in the `/data` directory. No comments were stripped,
so if there are any licenses, required by the original authors, they should be in the files.
I honestly don't know how that works, so ask someone who does before you use anything from the `/data` directory.
