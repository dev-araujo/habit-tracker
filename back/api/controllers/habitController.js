const db = require("../../config/database");

function jsonParse(data) {
  return { ...data, days: JSON.parse(data.days) };
}

function jsonStringify(data) {
  return { ...data, days: JSON.stringify(data.days) };
}
function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

const sql = "SELECT * FROM habits";
const params = [];

exports.getHabits = (req, res) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  db.all("SELECT * FROM habits", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    const processedRows = rows.map((row) => {
      const days = JSON.parse(row.days).map((day) => ({
        ...day,
        blocked: day.day < currentDay && !day.blocked ? true : day.blocked,
      }));
      return { ...row, days: days };
    });
    res.json(processedRows);
  });
};

exports.addHabit = (req, res) => {
  const { name } = req.body;
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const daysInMonth = getDaysInMonth(year, month);
  const days = [];

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      completed: false,
      blocked: i < currentDay,
    });
  }

  const data = { name, days: JSON.stringify(days) };

  const sql = "INSERT INTO habits (name, days) VALUES (?, ?)";
  const params = [data.name, data.days];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: { id: this.lastID, name, days },
    });
  });
};

exports.updateHabit = (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE habits SET name = ?, days = ? WHERE id = ?";
  const data = jsonStringify(req.body);
  const params = [data.name, data.days, id];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "success", data: data });
  });
};

exports.deleteHabit = (req, res) => {
  const sql = "DELETE FROM habits WHERE id = ?";
  const params = [req.params.id];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted" });
  });
};
