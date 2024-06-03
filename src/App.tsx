import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import SingleVerticalList from "@/pages/dnd/single-vertical-list";
import SingleVerticalList2 from "@/pages/dnd/single-vertical-list2";
import SingleVerticalList3 from "@/pages/dnd/single-vertical-list3";
import GanttProject from "@/pages/ganttProject";
import React183 from "./pages/react18";
import Ysy from "./pages/ysy";
function App() {
  return (
    <>
      <Suspense>
        <Routes>
          <Route
            path="/dnd/single-vertical-list"
            element={<SingleVerticalList />}
          />
          <Route
            path="/dnd/single-vertical-list2"
            element={<SingleVerticalList2 />}
          />
          <Route
            path="/dnd/single-vertical-list3"
            element={<SingleVerticalList3 />}
          />
          <Route path="/react183" element={<React183 />} />
          <Route path="/ganttProject" element={<GanttProject />} />
          <Route path="/ysy" element={<Ysy />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
