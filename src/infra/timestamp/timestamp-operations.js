export default class TimestampOperations {
  addDays(daysToAdd, timestamp = new Date()) {
    const newTimestamp = new Date(timestamp);
    newTimestamp.setDate(timestamp.getDate() + daysToAdd);
    return newTimestamp;
  }
}
