const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiUrl = "https://api.coingecko.com/api/v3/simple/price";

async function getBTCprice() {
    try {
        const response = await fetch(proxyUrl + apiUrl + "?ids=bitcoin&vs_currencies=usd");
        const data = await response.json();
        console.log(`Current BTC price: $${data.bitcoin.usd}`);

        document.getElementById("btc-price").innerHTML = `${data.bitcoin.usd}`;
    } catch (error) {
        console.error("Error fetching BTC price:", error);
    }
}

async function getETHprice() {
    try {
        const response = await fetch(proxyUrl + apiUrl + "?ids=ethereum&vs_currencies=usd");
        const data = await response.json();
        console.log(`Current ETH price: $${data.ethereum.usd}`);

        document.getElementById("eth-price").innerHTML = `${data.ethereum.usd}`;
    } catch (error) {
        console.error("Error fetching ETH price:", error);
    }
}

async function getLTCprice() {
    try {
        const response = await fetch(proxyUrl + apiUrl +"?ids=litecoin&vs_currencies=usd");
        const data = await response.json();
        console.log(`Current LTC price: $${data.litecoin.usd}`);
        document.getElementById("ltc-price").innerHTML = `${data.litecoin.usd}`;
    } catch (error) {
        console.error("Error fetching LTC price:", error);
    }
}

async function getBNBprice() {
    try {
        const response = await fetch(proxyUrl + apiUrl +"?ids=binancecoin&vs_currencies=usd");
        const data = await response.json();
        console.log(`Current BNB price: $${data.binancecoin.usd}`);
        document.getElementById("bnb-price").innerHTML = `${data.binancecoin.usd}`;
    } catch (error) {
        console.error("Error fetching BNB price:", error);
    }
}

async function getDOGEprice() {
    try {
        const response = await fetch(proxyUrl + apiUrl +"?ids=dogecoin&vs_currencies=usd");
        const data = await response.json();
        console.log(`Current DOGE price: $${data.dogecoin.usd}`);
        document.getElementById("doge-price").innerHTML = `${data.dogecoin.usd}`;
    } catch (error) {
        console.error("Error fetching DOGE price:", error);
    }
}

// Initial calls
getBTCprice();
setInterval(getBTCprice, 60000);

getETHprice();
setInterval(getETHprice, 60000);

getLTCprice();
setInterval(getLTCprice, 60000);

getBNBprice();
setInterval(getBNBprice, 60000);

getDOGEprice();
setInterval(getDOGEprice, 60000);