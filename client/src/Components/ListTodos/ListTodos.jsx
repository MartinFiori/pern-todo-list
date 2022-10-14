import React, { useState, useEffect } from "react";

// components
import EditTodo from "../EditTodo/EditTodo";

const ListTodos = () => {
	const [todos, setTodos] = useState([]);
	function handleGetTodos() {
		fetch("http://localhost:8080/todos")
			.then(res => res.json())
			.then(data => setTodos(data));
	}

	async function handleDeleteTodo(id) {
		try {
			const deleteTodo = await fetch(
				`http://localhost:8080/todos/${id}`,
				{
					method: "DELETE",
				}
			);
			setTodos(todos.filter(el => el.todo_id !== id));
		} catch (error) {
			console.error(error.message);
		}
	}

	useEffect(() => {
		handleGetTodos();
	}, []);
	return (
		<>
			<button onClick={() => console.log(todos)}>
				console.log(todos)
			</button>
			<table>
				<thead>
					<tr>
						<th>Time</th>
						<th>Description</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{todos.length ? (
						todos.map(el => (
							<tr key={el.todo_id}>
								<td>{el.createdat}</td>
								<td>{el.description}</td>
								<td>
									<EditTodo data={el} />
								</td>
								<td>
									<button
										onClick={() =>
											handleDeleteTodo(el.todo_id)
										}
									>
										BORRAR
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td>No hay Todos</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
};

export default ListTodos;
