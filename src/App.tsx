import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import SingleVerticalList from "@/pages/dnd/single-vertical-list";
function App() {
	return (
		<>
			<Suspense>
				<Routes>
					<Route
						path="/dnd/single-vertical-list"
						element={<SingleVerticalList />}
					/>
				</Routes>
			</Suspense>
		</>
	);
}

export default App;
