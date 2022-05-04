let plot1 = document.querySelector('#demo-1');
plot1.formula = 'x';

let plot2 = document.querySelector('#demo-2');
plot2.formula = '0.25x^3 + x^x - (0.2 * x) + 5!/120';

let plot3 = document.querySelector('#demo-3');
plot3.formula = '0.25x^3';
plot3.xMax = 500;
plot3.xMin = -25;

let plot4 = document.querySelector('#demo-4');
plot4.formula = '0.25x^3';
plot4.step = 0.5;

let plot5 = document.querySelector('#demo-5');
plot5.formula = '0.25x^3';
plot5.setNumDatapoints(50);