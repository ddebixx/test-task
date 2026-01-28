import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { Input } from "./Input"

describe("<Input />", () => {
    describe("Rendering", () => {
        it("should render an input element", () => {
            render(<Input />)
            const input = screen.getByRole("textbox")
            expect(input).toBeInTheDocument()
        })

        it("should render with data-slot attribute", () => {
            render(<Input />)
            const input = screen.getByRole("textbox")
            expect(input).toHaveAttribute("data-slot", "input")
        })

        it("should render with placeholder", () => {
            render(<Input placeholder="Enter text" />)
            const input = screen.getByPlaceholderText("Enter text")
            expect(input).toBeInTheDocument()
        })

        it("should render with custom className", () => {
            render(<Input className="custom-class" />)
            const input = screen.getByRole("textbox")
            expect(input).toHaveClass("custom-class")
        })
    })

    describe("Input types", () => {
        it("should render as text input by default", () => {
            render(<Input />)
            const input = screen.getByRole("textbox") as HTMLInputElement
            expect(input.type).toBe("text")
        })

        it("should render as email input", () => {
            render(<Input type="email" />)
            const input = document.querySelector('input[type="email"]')
            expect(input).toBeInTheDocument()
        })

        it("should render as password input", () => {
            render(<Input type="password" />)
            const input = document.querySelector('input[type="password"]')
            expect(input).toBeInTheDocument()
        })

        it("should render as number input", () => {
            render(<Input type="number" />)
            const input = screen.getByRole("spinbutton")
            expect(input).toBeInTheDocument()
        })
    })

    describe("Value handling", () => {
        it("should render with default value", () => {
            render(<Input defaultValue="default text" />)
            const input = screen.getByRole("textbox") as HTMLInputElement
            expect(input.value).toBe("default text")
        })

        it("should render with controlled value", () => {
            render(<Input value="controlled text" onChange={() => { }} />)
            const input = screen.getByRole("textbox") as HTMLInputElement
            expect(input.value).toBe("controlled text")
        })

        it("should handle user input", async () => {
            const user = userEvent.setup()
            const handleChange = vi.fn()
            render(<Input onChange={handleChange} />)
            const input = screen.getByRole("textbox")

            await user.type(input, "test")

            expect(handleChange).toHaveBeenCalled()
            expect(handleChange).toHaveBeenCalledTimes(4) // once per character
        })
    })

    describe("States", () => {
        it("should be disabled when disabled prop is true", () => {
            render(<Input disabled />)
            const input = screen.getByRole("textbox")
            expect(input).toBeDisabled()
        })

        it("should be enabled by default", () => {
            render(<Input />)
            const input = screen.getByRole("textbox")
            expect(input).toBeEnabled()
        })

        it("should be readonly when readonly prop is true", () => {
            render(<Input readOnly />)
            const input = screen.getByRole("textbox")
            expect(input).toHaveAttribute("readonly")
        })

        it("should have aria-invalid when invalid", () => {
            render(<Input aria-invalid />)
            const input = screen.getByRole("textbox")
            expect(input).toHaveAttribute("aria-invalid")
        })
    })

    describe("Accessibility", () => {
        it("should have accessible name when aria-label is provided", () => {
            render(<Input aria-label="Username" />)
            const input = screen.getByLabelText("Username")
            expect(input).toBeInTheDocument()
        })

        it("should support aria-describedby", () => {
            render(
                <>
                    <Input aria-describedby="helper-text" />
                    <span id="helper-text">Helper text</span>
                </>
            )
            const input = screen.getByRole("textbox")
            expect(input).toHaveAttribute("aria-describedby", "helper-text")
        })

        it("should be required when required prop is true", () => {
            render(<Input required />)
            const input = screen.getByRole("textbox")
            expect(input).toBeRequired()
        })
    })

    describe("Event handlers", () => {
        it("should call onFocus when focused", async () => {
            const user = userEvent.setup()
            const handleFocus = vi.fn()
            render(<Input onFocus={handleFocus} />)
            const input = screen.getByRole("textbox")

            await user.click(input)

            expect(handleFocus).toHaveBeenCalledTimes(1)
        })

        it("should call onBlur when blurred", async () => {
            const user = userEvent.setup()
            const handleBlur = vi.fn()
            render(<Input onBlur={handleBlur} />)
            const input = screen.getByRole("textbox")

            await user.click(input)
            await user.tab()

            expect(handleBlur).toHaveBeenCalledTimes(1)
        })

        it("should call onClick when clicked", async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()
            render(<Input onClick={handleClick} />)
            const input = screen.getByRole("textbox")

            await user.click(input)

            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    })

    describe("Additional attributes", () => {
        it("should support name attribute", () => {
            render(<Input name="username" />)
            const input = screen.getByRole("textbox")
            expect(input).toHaveAttribute("name", "username")
        })

        it("should support id attribute", () => {
            render(<Input id="username-input" />)
            const input = screen.getByRole("textbox")
            expect(input).toHaveAttribute("id", "username-input")
        })

        it("should support maxLength attribute", () => {
            render(<Input maxLength={10} />)
            const input = screen.getByRole("textbox")
            expect(input).toHaveAttribute("maxLength", "10")
        })

        it("should support autoComplete attribute", () => {
            render(<Input autoComplete="email" />)
            const input = screen.getByRole("textbox")
            expect(input).toHaveAttribute("autoComplete", "email")
        })

        it("should support pattern attribute", () => {
            render(<Input pattern="[0-9]*" />)
            const input = screen.getByRole("textbox")
            expect(input).toHaveAttribute("pattern", "[0-9]*")
        })
    })
})
