import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SharePlace from "./Pages/SharePlace.tsx";
import MyPlace from "./Pages/MyPlace.tsx";
import ErrorPage from "./Pages/ErrorPage.tsx";
import "./index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <SharePlace />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/my-place",
		element: <MyPlace />,
		errorElement: <ErrorPage />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
