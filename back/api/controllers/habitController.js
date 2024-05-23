const db = require("../../config/database");

function jsonParse(data) {
  return { ...data, days: JSON.parse(data.days) };
}

function jsonStringify(data) {
  return { ...data, days: JSON.stringify(data.days) };
}
const sql = "SELECT * FROM habits";
const params = [];

exports.getHabits = (req, res) => {
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows.map(jsonParse));
  });
};

exports.addHabit = (req, res) => {
  const { name } = req.body;
  const days = [];

  for (let i = 1; i <= 30; i++) {
    days.push({ day: i, completed: false });
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
