import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { AuthProvider } from "../../context/index";
import { BrowserRouter } from "react-router-dom";
import UserHeader from "./UserHeader.component";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { getPicture } from "../../utils/queries";

// Mock the getPicture async method used by the component
jest.mock("../../utils/utils", () => ({
	getPicture: jest.fn(),
}));

test("shows skeleton on first render, then shows the Avatar component", async () => {
	(getPicture as jest.Mock).mockResolvedValueOnce("someURL");
	render(
		<AuthProvider>
			<UserHeader name="Sven" />
		</AuthProvider>
	);
	// Avatar should not be in the doc, skeleton should be
	expect(screen.getByTestId("skeleton")).toBeInTheDocument();
	expect(screen.queryByAltText("Sven")).not.toBeInTheDocument(); // queryBy instead of getBy which would throw an error
	expect(getPicture).toHaveBeenCalledTimes(1);
	await waitFor(() => screen.getByAltText("Sven"));
	expect(screen.getByAltText("Sven")).toBeInTheDocument();
});

test("user-dropdown becomes visible when avatar is clicked", async () => {
	(getPicture as jest.Mock).mockResolvedValueOnce("someURL");
	render(
		<BrowserRouter>
			<AuthProvider>
				<UserHeader name="Sven" />
			</AuthProvider>
		</BrowserRouter>
	);
	await waitFor(() => screen.getByAltText("Sven"));
	expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
	fireEvent.click(screen.getByAltText("Sven"));
	expect(screen.getByTestId("dropdown")).toBeVisible();
});
