import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./index.css";

const initialStateTodos = [
	{
		id: 1,
		index: 1,
		title: "Ir de Juerga11",
		completed: false,
	},
	{
		id: 2,
		index: 2,
		title: "Ir al gimnasio",
		completed: false,
	},
	{
		id: 3,
		index: 3,
		title: "Estudiar React11",
		completed: true,
	},
	{
		id: 4,
		index: 4,
		title: "Estudiar React2",
		completed: true,
	},
	{
		id: 5,
		index: 5,
		title: "Estudiar React3",
		completed: true,
	},
	{
		id: 6,
		index: 6,
		title: "Estudiar React4",
		completed: true,
	},
];

type SingleVerticalListProps = {};

const SingleVerticalList: React.FC<SingleVerticalListProps> = (props) => {
	const [todos, setTodos] = useState(initialStateTodos);
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);
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
		<div>
			<DragDropContext onDragEnd={handleDragEnd}>
				<h1>Todo App</h1>
				<Droppable droppableId="todos">
					{(droppableProvider) => (
						<ul
							ref={droppableProvider.innerRef}
							{...droppableProvider.droppableProps}
						>
							{todos.slice(0, 2).map((todo) => (
								<Draggable
									index={todo.index}
									key={todo.id}
									draggableId={`${todo.id}`}
								>
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
							{todos.slice(2, 4).map((todo) => (
								<Draggable
									index={todo.index}
									key={todo.id}
									draggableId={`${todo.id}`}
								>
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
							{todos.slice(4).map((todo) => (
								<Draggable
									index={todo.index}
									key={todo.id}
									draggableId={`${todo.id}`}
								>
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
		</div>
	);
};

export default SingleVerticalList;
