import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "production",
  pure: false,
})
export class ProductionPipe implements PipeTransform {
  transform(punch: any): any {
    const prod = punch;
    console.log(punch);
    return this.calculate(prod);
  }
  // console.log(hourDiff)
  calculate(prod: any) {
    var startTime = "00:00:00";
    let totalProduction;
    let timeDiff;
    let i = 0;
    while (i <= prod.length) {
      if (prod[i] && prod[i + 1]) {
        timeDiff = this.diff(prod[i].time, prod[i + 1].time);
      } else {
        break;
      }
      i += 2;
      totalProduction = this.addTimes(startTime, timeDiff);
      startTime = totalProduction;
    }

    return startTime;
  }

  diff(start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    // diff -= minutes = minutes * 1000 * 60 * 60
    // var second = Math.floor(diff / 1000)
    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0) hours = hours + 24;

    return (
      (hours <= 9 ? "0" : "") +
      hours +
      ":" +
      (minutes <= 9 ? "0" : "") +
      minutes
    );
  }

  addTimes(startTime, endTime) {
    console.log("adTimes", startTime, endTime);
    var times = [0, 0, 0];
    var max = times.length;

    var a = (startTime || "").split(":");
    var b = (endTime || "").split(":");

    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i]);
    }

    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i];
    }

    var hours = times[0];
    var minutes = times[1];
    var seconds = times[2];

    if (seconds >= 60) {
      var m = (seconds / 60) << 0;
      minutes += m;
      seconds -= 60 * m;
    }

    if (minutes >= 60) {
      var h = (minutes / 60) << 0;
      hours += h;
      minutes -= 60 * h;
    }

    return (
      ("0" + hours).slice(-2) +
      ":" +
      ("0" + minutes).slice(-2) +
      ":" +
      ("0" + seconds).slice(-2)
    );
  }
}

@Pipe({
  name: "breaktime",
  pure: false,
})
export class BreakTime implements PipeTransform {
  transform(punch: any): any {
    const prod = punch;
    console.log(punch);
    return this.calculate(prod);
  }
  // console.log(hourDiff)
  calculate(prod: any) {
    var startTime = "00:00:00";
    let totalProduction;
    let timeDiff;
    let i = 0;
    while (i <= prod.length) {
      if (prod[i + 1] && prod[i + 2]) {
        timeDiff = this.diff(prod[i + 1].time, prod[i + 2].time);
      } else {
        break;
      }
      i += 3;
      totalProduction = this.addTimes(startTime, timeDiff);
      startTime = totalProduction;
    }

    return startTime;
  }

  diff(start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    // diff -= minutes = minutes * 1000 * 60 * 60
    // var second = Math.floor(diff / 1000)
    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0) hours = hours + 24;

    return (
      (hours <= 9 ? "0" : "") +
      hours +
      ":" +
      (minutes <= 9 ? "0" : "") +
      minutes
    );
  }

  addTimes(startTime, endTime) {
    console.log("adTimes", startTime, endTime);
    var times = [0, 0, 0];
    var max = times.length;

    var a = (startTime || "").split(":");
    var b = (endTime || "").split(":");

    // normalize time values
    for (var i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i]);
    }

    // store time values
    for (var i = 0; i < max; i++) {
      times[i] = a[i] + b[i];
    }

    var hours = times[0];
    var minutes = times[1];
    var seconds = times[2];

    if (seconds >= 60) {
      var m = (seconds / 60) << 0;
      minutes += m;
      seconds -= 60 * m;
    }

    if (minutes >= 60) {
      var h = (minutes / 60) << 0;
      hours += h;
      minutes -= 60 * h;
    }

    return (
      ("0" + hours).slice(-2) +
      ":" +
      ("0" + minutes).slice(-2) +
      ":" +
      ("0" + seconds).slice(-2)
    );
  }
}
@Pipe({
  name: "breaktime",
  pure: false,
})
export class OverTime implements PipeTransform {
  transform(punch: any): any {
    const prod = punch;
    console.log(punch);
    return this.calculate(prod);
  }

  calculate(prod: any) {
    var startTime = "00:00:00";
    let totalProduction;
    let timeDiff;
    let i = 0;
  }

  // return('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
}
