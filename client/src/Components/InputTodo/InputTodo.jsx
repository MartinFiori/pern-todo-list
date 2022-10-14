import React, { useState } from "react";

const InputTodo = () => {
	const [description, setDescription] = useState("");
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await fetch("http://localhost:8080/todos", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ description }),
			});
			window.location = "/";
		} catch (error) {
			console.error(error.message);
		}
	};
	return (
		<div>
			<h1>Pern Todo List</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder=""
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<button type="submit">Add</button>
			</form>
		</div>
	);
};

export default InputTodo;
