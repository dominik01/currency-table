import './App.css';
import Searchbar from "./Searchbar";
import CurrencyList from "./CurrencyList";
import {useState, useEffect} from "react";
//import data from "./fx.json";

const CURRENCY_API = "https://run.mocky.io/v3/c88db14a-3128-4fbd-af74-1371c5bb0343";

function App() {
    const [currencies, setCurrencies] = useState([]);
    const [filteredCurrencies, setFilteredCurrencies] = useState([]);
    const [search, setSearch] = useState("");
    const [loaded, setLoaded] = useState(false);
    const headerName = "George FE Test";

    useEffect(() => {
        fetch(CURRENCY_API)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                setCurrencies(data);
                setLoaded(true);
            })
            .catch((error) => console.log(error))
    }, []);

    useEffect(() => {
        if (!currencies.fx) {
            return;
        }
        setFilteredCurrencies(
            currencies.fx.filter((currency) =>
                currency.currency.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, currencies]);

    if (!loaded) {
        return <p>Loading currencies...</p>
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="heading-name">
                    <h1>{headerName}</h1>
                </div>
            </header>
            <nav>
                <Searchbar onChange={value => setSearch(value)}/>
            </nav>
            <main>
                <section className="currency-list">
                    <CurrencyList currencies={filteredCurrencies} baseCurrency={currencies.baseCurrency}/>
                </section>
            </main>
        </div>
    );
}

export default App;
