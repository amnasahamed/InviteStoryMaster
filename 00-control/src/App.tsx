import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import NewClient from "./pages/NewClient";
import Editor from "./pages/Editor";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="new" element={<NewClient />} />
        <Route path="client/:slug" element={<Editor />} />
      </Route>
    </Routes>
  );
}
