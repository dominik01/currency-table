import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

const Searchbar = props => {
    const CURRENCY_NAME = 'currency';
    const [query, setQuery] = useState("");
    const history = useHistory();

    const onChange = (event) => {
        setQuery(event.target.value);
        props.onChange(event.target.value);
    }

    useEffect(() => {
        const currency = new URLSearchParams(window.location.search).get(CURRENCY_NAME);
        if(currency){
            setQuery(currency);
            props.onChange(currency);
        }
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();

        if (query) {
            params.append(CURRENCY_NAME, query);
        } else {
            params.delete(CURRENCY_NAME);
        }
        history.push({search: params.toString()})
    }, [query, history])

    return (
        <div className="searchbar-panel">
            <label htmlFor="search-input">Search: </label>
            <input name="currency-filter" id="search-input" placeholder="Currency name"
                   value={query} onChange={onChange}/>
        </div>
    )
}

export default Searchbar;
