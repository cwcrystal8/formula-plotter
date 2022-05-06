import * as echarts from "https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.esm.min.js";

// let math = await import("https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.5.1/math.min.js");

class FormulaPlotter extends HTMLElement {
    #varName = 'x';
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
    <div id='inputs' part='inputs'>
        <label> Formula
            <input type='text' id='formula'>
        </label>
        <label> X-Min
            <input type='number' id='x-min' placeholder='0'>
        </label>
        <label> X-Max
            <input type='number' id='x-max' placeholder='100'>
        </label>
    </div>

    <div id='graph' part='graph'></div>
		`;
        this.formulaInput = this.shadowRoot.querySelector("#formula");
        this.formula = this.formulaInput.value;
        this.formulaInput.addEventListener("change", (e) => {
            this.formula = this.formulaInput.value;
            this.#render();
        });

        this.xMinInput = this.shadowRoot.querySelector("#x-min");
        this.xMin = this.xMinInput.value;
        this.xMinInput.addEventListener("change", (e) => {
            this.xMin = this.xMinInput.value;
            this.#render();
        });

        this.xMaxInput = this.shadowRoot.querySelector("#x-max");
        this.xMax = this.xMaxInput.value;
        this.xMaxInput.addEventListener("change", (e) => {
            this.xMax = this.xMaxInput.value;
            this.#render();
        });

        this.step = 1;
    }

    get varName() { return this.#varName; }
    set varName(v) { this.#varName = v; this.setAttribute("var-name", v); }

    static get observedAttributes() { return ["var-name"] }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "var-name") this.#varName = newValue;
        this.#render();
    }

    connectedCallback() {
        this.#render();
    }

    #render() {
        if (this.formula) {
            let data = this.#getData();

            let xValues = data[0];
            let yValues = data[1];

            this.#graph(xValues, yValues);

            let evt = new CustomEvent("plotted", {
                detail: {
                    formula: this.formula,
                    xMin: parseFloat(this.xMin || 0),
                    xMax: parseFloat(this.xMax || 100),
                    xValues: xValues,
                    yValues: yValues
                }
            });
            this.dispatchEvent(evt);
        }
    }

    #getData() {
        let xValues = [];
        let yValues = [];

        if (!this.xMin) {
            this.xMin = 0;
        }

        if (!this.xMax) {
            this.xMax = 100;
        }

        for (let x = parseFloat(this.xMin); x <= parseFloat(this.xMax); x += parseFloat(this.step)) {
            xValues.push(x);
            yValues.push(this.#evaluate(x));
        }

        return [xValues, yValues];
    }

    #graph(xValues, yValues) {
        let chartDom = this.shadowRoot.querySelector("#graph");
        let myChart = echarts.init(chartDom);

        let option = {
            title: {
                text: this.formula
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xValues,
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    type: 'line',
                    data: yValues,
                    showSymbol: false,
                }
            ]
        };

        option && myChart.setOption(option);
    }

    #evaluate(x) {
        let formula = this.formula.replaceAll(this.varName, '(' + x + ')');
        return eval(formula);
    }

    setNumDatapoints(n) {
        this.step = (this.xMax - this.xMin) / n;
        this.#render();
    }

    setFormula(f) {
        this.formula = f;
        this.formulaInput.value = f;
        this.#render();
    }

    setXMin(x) {
        this.xMin = x;
        this.xMinInput.value = x;
        this.#render();
    }

    setXMax(x) {
        this.xMax = x;
        this.xMaxInput.value = x;
        this.#render();
    }

    setStep(step) {
        this.step = step;
        this.#render();
    }


}

export { FormulaPlotter };