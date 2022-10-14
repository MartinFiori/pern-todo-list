import React, { useState } from "react";
import s from "./EditTodo.module.css";

export default function EditTodo({ data }) {
	const [isOpen, setIsOpen] = useState(false);
	const [description, setDescription] = useState(data.description);

	const handleUpdateTodo = async id => {
		try {
			await fetch(`http://localhost:8080/todos/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ description }),
			});
			window.location = "/";
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleSetOpen = () => {
		setIsOpen(!isOpen);
	};
	return (
		<>
			<button onClick={handleSetOpen}>Edit</button>
			{isOpen && (
				<div>
					<div className={s.overlay}></div>
					<div className={s.content}>
						<input
							type="text"
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
						<div className={s.btnContainer}>
							<button
								onClick={() => {
									handleSetOpen();
									setDescription(data.description);
								}}
							>
								Cancel
							</button>
							<button
								onClick={() => handleUpdateTodo(data.todo_id)}
							>
								Save Changes
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
