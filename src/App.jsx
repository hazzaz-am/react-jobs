import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import AddJobPage from "./pages/AddJobPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/jobs",
				element: <JobsPage />,
			},
			{
				path: "/add-job",
				element: <AddJobPage />,
			},
			{
				path: "*",
				element: <NotFoundPage />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};
export default App;
