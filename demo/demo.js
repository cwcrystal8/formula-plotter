let plot1 = document.querySelector('#demo-1');
plot1.setFormula('x');

let plot2 = document.querySelector('#demo-2');
plot2.setFormula('0.25 * x ** 3 + x ** (x / 100) - (0.2 * x) + 1');

let plot3 = document.querySelector('#demo-3');
plot3.setFormula('0.25 * x ** 3');
plot3.setXMax(500);
plot3.setXMin(-20);

let plot4 = document.querySelector('#demo-4');
plot4.setFormula('0.25 * x ** 3');
plot4.setStep(0.5);

let plot5 = document.querySelector('#demo-5');
plot5.setFormula('0.25 * x ** 3');
plot5.setNumDatapoints(50);

let plot6 = document.querySelector('#demo-6');
plot6.addEventListener("plotted", 
    (e) => {
        let div = document.querySelector("#demo-6-div");
        div.textContent = 'Current formula: ' + e.detail.formula;
    }
);
plot6.setFormula('0.25 * x ** 3');
plot6.setNumDatapoints(50);