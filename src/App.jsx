import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import AddJobPage from "./pages/AddJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";

const App = () => {
	const addJob = async (newJob) => {
		await fetch("/api/jobs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newJob),
		});

		return;
	};

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
					path: "/jobs/:jobId",
					element: <JobPage />,
					loader: async ({ params }) =>
						await fetch(`/api/jobs/${params.jobId}`),
				},
				{
					path: "/add-job",
					element: <AddJobPage addJob={addJob} />,
				},
				{
					path: "*",
					element: <NotFoundPage />,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};
export default App;
