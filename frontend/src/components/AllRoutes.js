import { Routes, Route } from "react-router-dom";
import Text from "../pages/Text";
import Emotions from "../pages/Emotions";
import Summarization from "../pages/Summarization";

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/text" element={<Text />} />
        <Route path="/summarization" element={<Summarization />} />
        <Route path="/emotions" element={<Emotions />} />
        <Route path="/" element={<div></div>} />
    </Routes>
  )
}

export default AllRoutes