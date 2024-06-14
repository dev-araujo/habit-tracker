const db = require("../../config/database");
const HabitUtils = require("../utils/HabitUtils");

exports.getHabits = (req, res) => {
  const sql = "SELECT * FROM habits";
  const params = [];

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    const processedRows = rows.map((row) => {
      const days = JSON.parse(row.days).map((day) => ({
        ...day,
        blocked: day.blocked,
      }));
      return { ...row, days: days };
    });
    res.json(processedRows);
  });
};

exports.addHabit = (req, res) => {
  const { name } = req.body;
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const days = HabitUtils.getInitialDays(month, year);

  const data = { name, days: JSON.stringify(days) };

  const sql = "INSERT INTO habits (name, days) VALUES (?, ?)";
  const params = [data.name, data.days];

  db.run(sql, params, (err) => {
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
  const data = HabitUtils.jsonStringify(req.body);
  const params = [data.name, data.days, id];

  db.run(sql, params, (err) => {
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
  db.run(sql, params, (err) => {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted" });
  });
};
