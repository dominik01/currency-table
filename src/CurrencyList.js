const CurrencyList = props => {
    const currencies = props.currencies;
    const baseCurrency = props.baseCurrency;
    const fallBackSrc = "flags/no-flag.png";

    const isValidCurrency = (currency) => {
        return !(!currency.exchangeRate
            || !currency.exchangeRate.buy
            || isNaN(currency.exchangeRate.buy)
            || currency.exchangeRate.buy <= 0);
    }
    const listCurrencies =
        currencies.filter((currency) => isValidCurrency(currency)).map((currency, index) => {
            const flagSrc = "flags/" + currency.currency.toLowerCase().substr(0, 2) + ".png";

            return (
                <div key={index} className="currency-item">
                    <div className="foreign-currency">
                        <img src={flagSrc} alt={"flag"} onError={e => e.target.src = fallBackSrc}/>
                        <span className="currency-shortcut">{currency.currency}</span> <span
                        className="currency-name"> {currency.nameI18N && "(" + currency.nameI18N + ")"}</span>
                    </div>
                    <div className="base-currency">
                        {currency.exchangeRate.buy * 1} {baseCurrency}
                    </div>
                </div>
            )
        });

    return (
        <div>{listCurrencies}</div>
    )
}

export default CurrencyList
