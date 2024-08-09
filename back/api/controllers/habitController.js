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
      return {
        ...row,
        days: JSON.parse(row.days),
        createdAt: row.createdAt,
        endDate: row.endDate,
      };
    });
    res.json(processedRows);
  });
};

exports.addHabit = (req, res) => {
  const { name } = req.body;
  const currentDate = new Date();

  const days = HabitUtils.getInitialDays();
  const createdAt = currentDate.toISOString();
  const endDate = new Date(
    currentDate.getTime() + 15 * 24 * 60 * 60 * 1000
  ).toISOString();

  const data = { name, days: JSON.stringify(days), createdAt, endDate };

  const sql =
    "INSERT INTO habits (name, days, createdAt, endDate) VALUES (?, ?, ?, ?)";
  const params = [data.name, data.days, data.createdAt, data.endDate];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: { id: this.lastID, name, days, createdAt, endDate },
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
