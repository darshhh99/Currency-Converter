const API_KEY = "YOUR_API_KEY"; // Replace with your API key
const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("form button");
const amountInput = document.querySelector(".amount input");
const msg = document.querySelector(".msg");

const countryList = {
    USD: "US",
    EUR: "EU",
    INR: "IN",
    GBP: "GB",
    AUD: "AU",
    CAD: "CA",
    JPY: "JP"
};

const initializeDropdowns = () => {
    dropdowns.forEach(select => {
        for (let currCode in countryList) {
            let option = document.createElement("option");
            option.value = currCode;
            option.textContent = currCode;
            select.appendChild(option);
        }
        select.selectedIndex = 0;
        updateFlag(select);
        select.addEventListener("change", () => updateFlag(select));
    });
};

const updateFlag = (select) => {
    const currCode = select.value;
    const countryCode = countryList[currCode];
    const img = select.nextElementSibling;
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

const updateExchangeRate = async () => {
    try {
        let amount = amountInput.value;
        if (!amount || amount < 1) {
            amount = 1;
            amountInput.value = "1";
        }

        const fromCurrency = dropdowns[0].value;
        const toCurrency = dropdowns[1].value;
        const URL = `${BASE_URL}${fromCurrency}?apikey=${API_KEY}`;

        let response = await fetch(URL);
        if (!response.ok) throw new Error("Unable to fetch data");

        let data = await response.json();
        let rate = data.rates[toCurrency];

        let finalAmount = amount * rate;
        msg.innerText = `${amount} ${fromCurrency} = ${finalAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        msg.innerText = `Error: ${error.message}`;
    }
};

btn.addEventListener("click", (event) => {
    event.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    initializeDropdowns();
});

