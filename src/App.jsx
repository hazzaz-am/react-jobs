import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import AddJobPage from "./pages/AddJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
	// add job
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

	// delete job
	const deleteJob = async (jobId) => {
		await fetch(`/api/jobs/${jobId}`, {
			method: "DELETE",
		});

		return;
	};

	// update job
	const updateJob = async (job) => {
		await fetch(`/api/jobs/${job.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(job),
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
					element: <JobPage deleteJob={deleteJob} />,
					loader: async ({ params }) =>
						await fetch(`/api/jobs/${params.jobId}`),
				},
				{
					path: "/add-job",
					element: <AddJobPage addJob={addJob} />,
				},
				{
					path: "/edit-job/:jobId",
					element: <EditJobPage updateJob={updateJob} />,
					loader: async ({ params }) =>
						await fetch(`/api/jobs/${params.jobId}`),
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
