import { screen } from "@testing-library/react";
import { LoginPage } from "../LoginPage";
import { render } from "../../test/test-utils";

describe("LoginPage", () => {
  it("renders Login and Create Account tabs", () => {
    render(<LoginPage />);
    const loginTab = screen.getByTestId("login-tab");
    const registerTab = screen.getByTestId("register-tab");
    expect(loginTab).toBeTruthy();
    expect(registerTab).toBeTruthy();
  });
});
