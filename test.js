var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var q = require('q');
var throttle = require('./index');


chai.use(chaiAsPromised);
chai.should();

describe('throttle', function() {
  var deferred;
  var deferredList = [];
  var promises = [];
  var promiseFactory = function(i) {
    return deferredList[i].promise;
  };
  var throttleFunc = throttle(promiseFactory, 5);

  beforeEach(function() {
    for(var i = 0; i < 10; i++) {
      deferred = q.defer();
      deferredList.push(deferred);
      promises.push(throttleFunc(i));
    }

    setTimeout(function() {
      for(var i = 0; i < 10; i++) {
        deferredList[i].resolve();
      }
    }, 0);
  });

  it('returns a resolving promise', function(done) {
    q.all(promises)
      .should.eventually.be.fulfilled
      .notify(done);
  });
});
