class HabitUtils {
  static jsonStringify(data) {
    return { ...data, days: JSON.stringify(data.days) };
  }

  static getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  static getInitialDays(month, year) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const daysInMonth = this.getDaysInMonth(year, month);
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        completed: false,
        blocked: i < currentDay,
      });
    }
    return days;
  }
}

module.exports = HabitUtils;
