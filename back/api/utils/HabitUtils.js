class HabitUtils {
  static jsonStringify(data) {
    return { ...data, days: JSON.stringify(data.days) };
  }

  static getInitialDays(daysInMonth = 15) {
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        completed: false,
      });
    }
    return days;
  }
}

module.exports = HabitUtils;
