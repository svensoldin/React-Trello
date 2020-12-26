import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "../../context/index";
import LoginForm from "./LoginForm.component";
import { render, fireEvent, cleanup } from "@testing-library/react";

afterEach(cleanup);

const renderWithContext = (child: React.ReactNode) => {
	return render(<AuthProvider>{child}</AuthProvider>);
};

test("inputting credentials updates the state", () => {
	const { getByText, getByLabelText } = renderWithContext(<LoginForm />);
	const emailInput = getByLabelText("email-input") as HTMLInputElement; // Cast the input element to the right type
	const passwordInput = getByLabelText("password-input") as HTMLInputElement;
	expect(emailInput.value).toBe(""); // Arrange
	expect(passwordInput.value).toBe("");
	fireEvent.change(emailInput, {
		target: { value: "Some email" },
	}); // Act
	fireEvent.change(passwordInput, {
		target: { value: "12345678" },
	});
	expect(emailInput.value).toBe("Some email"); // Assert
	expect(passwordInput.value).toBe("12345678");
});
