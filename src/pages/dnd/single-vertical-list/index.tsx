import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialStateTodos = [
	{
		id: 0,
		index: 0,
		title: "0000000000",
		completed: false,
	},
	{
		id: 1,
		index: 1,
		title: "111111111",
		completed: false,
	},
	{
		id: 2,
		index: 2,
		title: "2222222222",
		completed: true,
	},
	{
		id: 3,
		index: 3,
		title: "3333333333",
		completed: false,
	},
	{
		id: 4,
		index: 4,
		title: "444444444",
		completed: false,
	},
	{
		id: 5,
		index: 5,
		title: "5555555555",
		completed: false,
	},
	{
		id: 6,
		index: 6,
		title: "66666666",
		completed: false,
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
	const onDragEnd = (e) => {
		console.log("🚀 ~ handleDragEnd ~ result:", e);
		if (!e.destination) return;
		const startIndex = e.source.index;
		const endIndex = e.destination.index;
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
					<div
						ref={droppableProvider.innerRef}
						{...droppableProvider.droppableProps}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "20px",
							}}
						>
							{todos.slice(0, 2).map((todo) => (
								<Draggable
									index={todo.index}
									key={todo.id}
									draggableId={`${todo.id}`}
								>
									{(draggableProvider, snapshot) => {
										const { draggableProps, dragHandleProps } =
											draggableProvider;
										const draggableStyle = draggableProps?.style || {};

										return (
											<div
												ref={draggableProvider.innerRef}
												{...draggableProps}
												{...dragHandleProps}
												style={{
													...draggableStyle,
													border: "1px solid #000",
													padding: "10px",
													backgroundColor: snapshot.isDragging
														? "lightgreen"
														: "white",
												}}
											>
												{todo.title}
											</div>
										);
									}}
								</Draggable>
							))}
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "20px",
							}}
						>
							{todos.slice(2, 4).map((todo) => (
								<Draggable
									index={todo.index}
									key={todo.id}
									draggableId={`${todo.id}`}
								>
									{(draggableProvider, snapshot) => {
										const { draggableProps, dragHandleProps } =
											draggableProvider;
										const draggableStyle = draggableProps?.style || {};

										return (
											<div
												ref={draggableProvider.innerRef}
												{...draggableProps}
												{...dragHandleProps}
												style={{
													...draggableStyle,
													border: "1px solid #000",
													padding: "10px",
													backgroundColor: snapshot.isDragging
														? "lightgreen"
														: "white",
												}}
											>
												{todo.title}
											</div>
										);
									}}
								</Draggable>
							))}
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								gap: "20px",
							}}
						>
							{todos.slice(4).map((todo) => (
								<Draggable
									index={todo.index}
									key={todo.id}
									draggableId={`${todo.id}`}
								>
									{(draggableProvider, snapshot) => {
										const { draggableProps, dragHandleProps } =
											draggableProvider;
										const draggableStyle = draggableProps?.style || {};

										return (
											<div
												ref={draggableProvider.innerRef}
												{...draggableProps}
												{...dragHandleProps}
												style={{
													...draggableStyle,
													border: "1px solid #000",
													padding: "10px",
													backgroundColor: snapshot.isDragging
														? "lightgreen"
														: "white",
												}}
											>
												{todo.title}
											</div>
										);
									}}
								</Draggable>
							))}
						</div>
						{droppableProvider.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default SingleVerticalList;
