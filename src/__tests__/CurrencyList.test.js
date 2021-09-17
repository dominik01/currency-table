import {act} from "react-dom/test-utils";
import {render, unmountComponentAtNode} from "react-dom";
import CurrencyList from "../CurrencyList";

let container = null;
const correctCurrencyList = [{
    "currency": "MXN",
    "precision": 2,
    "nameI18N": "Mexican Peso",
    "exchangeRate": {
        "buy": 22.38,
        "middle": 22.98,
        "sell": 23.58,
        "indicator": 0,
        "lastModified": "2018-11-08T23:00:00Z"
    }
}];
const wrongCurrencyList = [{
    "currency" : "SKK",
    "exchangeRate" : null
}]


beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders list with correct name",  () => {
     act( () => {
        render(<CurrencyList currencies={correctCurrencyList} baseCurrency={"EUR"}/>, container);
    });
    expect(container.querySelector(".foreign-currency .currency-shortcut").textContent).toBe(correctCurrencyList[0].currency);
    expect(container.querySelector(".foreign-currency .currency-name").textContent).toBe(" (" + correctCurrencyList[0].nameI18N + ")");
});

it("renders list with correct price",  () => {
    act( () => {
        render(<CurrencyList currencies={correctCurrencyList} baseCurrency={"EUR"}/>, container);
    });
    expect(container.querySelector(".currency-item .base-currency").textContent).toBe(correctCurrencyList[0].exchangeRate.buy + " EUR" );
});

it("doesn't render list item with wrong data",  () => {
    act( () => {
        render(<CurrencyList currencies={wrongCurrencyList} baseCurrency={"EUR"}/>, container);
    });
    expect(container.querySelector(".currency-item")).toBeFalsy();
});
