document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display") as HTMLInputElement;
    const buttons = document.querySelectorAll(".button");
    let currentInput = "";
    let operator = "";
    let firstOperand: number | null = null;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value") as string;

            if (value === "C") {
                currentInput = "";
                operator = "";
                firstOperand = null;
                display.value = "";
            } else if (value === "=") {
                if (firstOperand !== null && operator) {
                    const secondOperand = parseFloat(currentInput);
                    currentInput = calculate(firstOperand, secondOperand, operator).toString();
                    display.value = currentInput;
                    operator = "";
                    firstOperand = null;
                }
            } else if (["+", "-", "*", "/"].includes(value)) {
                if (currentInput !== "") {
                    firstOperand = parseFloat(currentInput);
                    operator = value;
                    currentInput = "";
                }
            } else {
                currentInput += value;
                display.value = currentInput;
            }
        });
    });

    function calculate(a: number, b: number, op: string): number {
        switch (op) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return a / b;
            default:
                return 0;
        }
    }
});
