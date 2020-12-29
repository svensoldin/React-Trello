import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "../../context/index";
import LoginForm from "./LoginForm.component";
import { render, fireEvent } from "@testing-library/react";

const renderWithContext = (child: React.ReactNode) => {
	return render(<AuthProvider>{child}</AuthProvider>);
};

test("inputting credentials updates the state", () => {
	const { getByLabelText } = renderWithContext(<LoginForm />);
	const emailInput = getByLabelText("email-input") as HTMLInputElement; // Cast the input element to the right type
	const passwordInput = getByLabelText("password-input") as HTMLInputElement;
	// Arrange
	expect(emailInput.value).toBe("");
	expect(passwordInput.value).toBe("");
	// Act
	fireEvent.change(emailInput, {
		target: { value: "Some email" },
	});
	fireEvent.change(passwordInput, {
		target: { value: "12345678" },
	});
	// Assert
	expect(emailInput.value).toBe("Some email");
	expect(passwordInput.value).toBe("12345678");
});
