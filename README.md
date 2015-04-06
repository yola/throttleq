# throttleq

Limit the number of promises that can be simultaneously in flight.

## Usage

```javascript
var q = require('q');
var throttle = require('throttleq');

var promiseFactory = function() {
  ...
  return promise;
};

/* Takes promise returning function and number of simultaneously running
 * promises.
 */
var promiseThrottle = throttle(promiseFactory, 4);

q.all([
  promiseThrottle(args),
  ...
  promiseThrottle(args)
]);

```
