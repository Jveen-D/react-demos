import type React from "react";
import { useState } from "react";
import Demo from "./Demo";
type react183Props = {};

const React183: React.FC<react183Props> = (props) => {
	const [state, setState] = useState(0);
	const [num, setNum] = useState(0);

	return (
		<>
			<div>app: {state}</div>
			<button onClick={() => setState(state + 1)}>app组件+</button>
			<button onClick={() => setNum(num + 1)}>子组件+</button>
			<Demo sunNum={num} />
		</>
	);
};

export default React183;
