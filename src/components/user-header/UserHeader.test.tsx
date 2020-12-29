import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import { AuthProvider } from "../../context/index";
import UserHeader from "./UserHeader.component";
import { render, waitFor } from "@testing-library/react";
import { getPicture } from "../../utils/utils";

jest.mock("../../utils/utils", () => ({
	getPicture: jest.fn(),
}));

test("shows skeleton on first render, then shows the Avatar component", async () => {
	(getPicture as jest.Mock).mockImplementation(() => "someURL");
	const { getByTestId, getByAltText } = render(
		<AuthProvider>
			<UserHeader name="Sven" />
		</AuthProvider>
	);
	// Avatar should not be in the doc, skeleton should be
	expect(getByTestId("skeleton")).toBeInTheDocument();
	expect(getPicture).toHaveBeenCalled();
	const resolvedElement = await waitFor(() => getByAltText("Sven"));
	expect(resolvedElement).toBeInTheDocument();
});
