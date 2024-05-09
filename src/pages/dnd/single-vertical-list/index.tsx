import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialStateTodos = [
	{
		id: 1,
		title: "111111111",
		completed: false,
	},
	{
		id: 2,
		title: "2222222222",
		completed: false,
	},
	{
		id: 3,
		title: "33333333333",
		completed: true,
	},
];

type SingleVerticalListProps = {};

const SingleVerticalList: React.FC<SingleVerticalListProps> = (props) => {
	const [todos, setTodos] = React.useState(initialStateTodos);
	const onBeforeCapture = (e) => {
		console.log("🚀 ~ onBeforeCapture ~ onBeforeCapture:", e);
	};
	const onBeforeDragStart = (e) => {
		console.log("🚀 ~ onBeforeDragStart ~ onBeforeDragStart:", e);
	};
	const onDragStart = (e) => {
		console.log("🚀 ~ onDragStart ~ onDragStart:", e);
	};
	const onDragUpdate = (e) => {
		console.log("🚀 ~ onDragUpdate ~ onDragUpdate:", e);
	};
	const onDragEnd = (result) => {
		console.log("🚀 ~ handleDragEnd ~ result:", result);
		if (!result.destination) return;
		const startIndex = result.source.index;
		const endIndex = result.destination.index;
		const copyTodos = [...todos];
		const [reorderTodo] = copyTodos.splice(startIndex, 1);
		copyTodos.splice(endIndex, 0, reorderTodo);
		setTodos(copyTodos);
		return false;
	};
	return (
		<DragDropContext
			onBeforeCapture={onBeforeCapture}
			onBeforeDragStart={onBeforeDragStart}
			onDragStart={onDragStart}
			onDragUpdate={onDragUpdate}
			onDragEnd={onDragEnd}
		>
			<h1>Todo App</h1>
			<Droppable droppableId="todos" direction={"horizontal"}>
				{(droppableProvider) => (
					<ul
						style={{
							display: "flex",
							flexDirection: "row",
							gap: "20px",
						}}
						ref={droppableProvider.innerRef}
						{...droppableProvider.droppableProps}
					>
						{todos.map((todo, index) => (
							<Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
								{(draggableProvider) => (
									<li
										ref={draggableProvider.innerRef}
										{...draggableProvider.draggableProps}
										{...draggableProvider.dragHandleProps}
									>
										{todo.title}
									</li>
								)}
							</Draggable>
						))}
						{droppableProvider.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default SingleVerticalList;
