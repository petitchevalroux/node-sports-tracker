# Unofficial Sports-tracker.com api client
##Todo
* Write client documentation
* Publish package

## Workouts stream
Readable objectMode stream which read all workouts from [sport-trackers.com](http://www.sports-tracker.com/)

### Usage
```javascript
var WorkoutsStream = require("@petitchevalroux/sports-tracker-client").WorkoutsStream;
var wStream = new Stream({
    "user": "user@example.com",
    "password": "str0ngP4ssw0rd"
});
wStream.on("data", function (workout) {
    console.log(JSON.stringify(workout));
});
// Optional error handling
wStream.on("error", function (err) {
    console.log(err);
});
```

### Sample output
```json
{"activityId":2,"startTime":1449860034758,"totalTime":826.97,"totalDistance":4579.51,"totalAscent":0,"totalDescent":0,"startPosition":{"x":2.3457266666666667,"y":48.85936},"stopPosition":{"x":2.366095,"y":48.83288},"centerPosition":{"x":2.362041666666667,"y":48.846865},"maxSpeed":9.54,"recoveryTime":0,"cumulativeRecoveryTime":0,"rankings":{"totalTimeOnRouteRanking":{"originalRanking":0,"originalNumberOfWorkouts":0}},"cadence":{"max":0,"avg":0},"workoutKey":"566b22c9e4b090ceecf7cf90","avgSpeed":5.54,"hrdata":{"userMaxHR":180,"workoutMaxHR":0,"workoutAvgHR":0,"hrmax":0,"avg":0,"max":180},"avgPace":3.01,"energyConsumption":157,"commentCount":0,"pictureCount":0,"viewCount":0}
{"activityId":2,"startTime":1449733873900,"totalTime":4726.69,"totalDistance":31727.73,"totalAscent":0,"totalDescent":0,"startPosition":{"x":2.38189,"y":48.833621666666666},"stopPosition":{"x":2.34599,"y":48.85926},"centerPosition":{"x":2.448855,"y":48.81991},"maxSpeed":12.02,"recoveryTime":0,"cumulativeRecoveryTime":0,"rankings":{"totalTimeOnRouteRanking":{"originalRanking":0,"originalNumberOfWorkouts":0}},"cadence":{"max":0,"avg":0},"workoutKey":"56694ea8e4b074c880c49dc2","avgSpeed":6.71,"hrdata":{"userMaxHR":180,"workoutMaxHR":174,"workoutAvgHR":151,"hrmax":174,"avg":151,"max":180},"avgPace":2.48,"energyConsumption":1132,"commentCount":0,"pictureCount":0,"viewCount":0}
```

## Contributions
Before committing to this project please run make install-git-hook to ensure code quality ;-)
