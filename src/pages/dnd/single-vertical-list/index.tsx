import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialStateTodos = [
	{
		id: 1,
		title: "Ir de Juerga",
		completed: false,
	},
	{
		id: 2,
		title: "Ir al gimnasio",
		completed: false,
	},
	{
		id: 3,
		title: "Estudiar React",
		completed: true,
	},
];

type SingleVerticalListProps = {};

const SingleVerticalList: React.FC<SingleVerticalListProps> = (props) => {
	const [todos, setTodos] = React.useState(initialStateTodos);
	const handleDragEnd = (result) => {
		console.log(result);
		if (!result.destination) return;
		const startIndex = result.source.index;
		const endIndex = result.destination.index;
		const copyTodos = [...todos];
		const [reorderTodo] = copyTodos.splice(startIndex, 1);
		copyTodos.splice(endIndex, 0, reorderTodo);
		setTodos(copyTodos);
	};
	return (
		<DragDropContext onDragEnd={handleDragEnd}>
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
