/* Original code from: https://gist.github.com/gaearon/7930162
 */

var q = require('q');


var throttle = function(promiseFactory, limit) {
  var running = 0;
  var semaphore;

  var scheduleNextJob = function() {
    if (running < limit) {
      running++;
      return q();
    }

    if(!semaphore) {
      semaphore = q.defer();
    }

    return semaphore.promise.then(scheduleNextJob);
  };

  var processScheduledJobs = function() {
    running--;

    if (semaphore && running < limit) {
      semaphore.resolve();
      semaphore = null;
    }
  };

  return function() {
    var args = arguments;

    var runJob = function() {
      return promiseFactory.apply(this, args);
    };

    return scheduleNextJob()
      .then(runJob.bind(this))
      .then(processScheduledJobs);
  };
};


module.exports = throttle;
