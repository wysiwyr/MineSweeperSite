export default function (startTime, endTime) {
    if (startTime === undefined || endTime === undefined) return null;
    let output = '';
    let sec = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    let date = Math.floor(sec / 60 / 60 / 24);
    if (date > 0) {
        sec -= date * 60 * 60 * 24;
        output += date + '일';
    }

    let hour = Math.floor(sec / 60 / 60);
    if (hour > 0) {
        sec -= hour * 60 * 60;
        output += hour + '시';
    }

    let min = Math.floor(sec / 60);
    if (min > 0) {
        sec -= min * 60;
        output += min + '분';
    }

    return output += sec + '초';
}