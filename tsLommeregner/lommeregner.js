document.addEventListener("DOMContentLoaded", function () {
    var display = document.getElementById("display");
    var buttons = document.querySelectorAll(".button");
    var currentInput = "";
    var operator = "";
    var firstOperand = null;
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            var value = button.getAttribute("data-value");
            if (value === "C") {
                currentInput = "";
                operator = "";
                firstOperand = null;
                display.value = "";
            }
            else if (value === "=") {
                if (firstOperand !== null && operator) {
                    var secondOperand = parseFloat(currentInput);
                    currentInput = calculate(firstOperand, secondOperand, operator).toString();
                    display.value = currentInput;
                    operator = "";
                    firstOperand = null;
                }
            }
            else if (["+", "-", "*", "/"].includes(value)) {
                if (currentInput !== "") {
                    firstOperand = parseFloat(currentInput);
                    operator = value;
                    currentInput = "";
                }
            }
            else {
                currentInput += value;
                display.value = currentInput;
            }
        });
    });
    function calculate(a, b, op) {
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
