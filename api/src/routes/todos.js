const moment = require("moment");
const { Router } = require("express");
const pool = require("../../db");
const router = Router();

let m = moment();

router.post("/", async (req, res) => {
	try {
		const { description } = req.body;
		const time = m.format("DD/MM/YYYY hh:mm:ss a");
		const newTodo = await pool.query(
			"INSERT INTO todo (description, createdAt) VALUES($1, $2) RETURNING *",
			[description, time]
		);
		res.send(newTodo.rows[0]);
	} catch (error) {
		res.send({ Error: error.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const allTodos = await pool.query("SELECT * FROM todo");
		res.send(allTodos.rows);
	} catch (error) {
		res.send({ error: error.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const oneTodo = await pool.query(
			"SELECT * FROM todo WHERE todo_id = $1",
			[id]
		);
		res.send(oneTodo.rows[0]);
	} catch (error) {
		res.send({ error: error.message });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const updateTodo = await pool.query(
			"UPDATE todo SET description = $1 WHERE todo_id = $2",
			[description, id]
		);
		res.send("todo updated");
	} catch (error) {
		res.send({ error: error.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodo = await pool.query(
			"DELETE FROM todo WHERE todo_id = $1",
			[id]
		);
		res.json("todo deleted");
	} catch (error) {
		res.send({ error: error.message });
	}
});

module.exports = router;
