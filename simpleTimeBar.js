function SimpleTimeBar( end_time, data_object) {
  //programmatic counter representing the state of the time bar.

  if (typeof $ == "undefined") {
    throw("Error: must have jQuery loaded prior to instantiation of SimpleTimeBar objects");
  }
  this.time = 0;
  this.end_time = end_time;
  this.data_object = data_object;
  this.$ = $(this);
  var that = this;
  this._update = function() {
    //"private" function that is called every time the time-state is updated
    this.$.trigger('beforeUpdate', [this.time, this.percentage()]);
    this.$.trigger('update', [this.time, this.percentage()]);
    this.$.trigger('afterUpdate', [this.time,  this.percentage()]);

  }
  this.ratio = function() {
    //intended to compute the ratio of completion
    var rat;
    if (!(typeof this.end_time == "undefined")) {
      if (this.time >= this.end_time) {
        rat = 1;
      } else {
        rat =  (this.time / this.end_time);
      }
    } else {
      rat =  0
    }
    return rat


  }
  this.percentage = function() {
    //returns ratio of completion as a percentage, allowing for easy CSS-width manipulation
    return (this.ratio() * 100) + "%";

  }
  this._stop = function() {
    //"private" function that indicates the timer has been stopped, and is either 'complete' or 'failed'
    this.$.trigger('beforeStop');
    if (this.complete()) { 
      //stop is intended to be called on termination of the timer, i.e. when the current time tick meets or exceeds the timer's end-time
      this.$.trigger('beforeComplete', this.data_object)
      this.$.trigger('complete', this.data_object)
      this.$.trigger('afterComplete', this.data_object)

    } else {
      //or, if manually called (user does something that would stop the timer, and it's before the allotted time) then it registers as a failure

      this.$.trigger('beforeFailure', this.data_object);
      this.$.trigger('failure', this.data_object);
      this.$.trigger('afterFailure', this.data_object);
    }
    //reset the state of the timer so that we explicitly clear the timer, and 
    this.reset();

    this.$.trigger('stop');
    this.$.trigger('afterStop');
  }
  this.complete = function() {
    return this.ratio() == 1

  }
  this.reset = function () {
    //reset state to ease in garbage collection
    clearInterval(that.timer);
    this.end_time = 0;
    this.start_time = 0;
    this.data_object = null;

  }
  this.begin = function() {
    this._start();

  }
  this._start = function() {
    that.$.trigger('beforeStart');

    that.timer = setInterval(function() {
      console.log("ticking");
      that.time = that.time + 1;
      try {
        if (that.complete()) {
          that._update();
          that._stop()

        } else {
          that._update();
        }
      } catch(err) {   
        console.log("Error occurred");
        console.log(err)

      }
    }, 1000);

    try {
      that.$.trigger('start');
      that.$.trigger('afterStart');
    } catch(err) {
      console.log("error", err);

    }

  }

}
