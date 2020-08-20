// Get Quote from API
async function getQuote() {
  // We need to use a Proxy URL to make our API call in order to avoid a CORS error
  const proxyUrl = 'https://calm-brushlands-78577.herokuapp.com/';
  const apiUrl =
    'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    getQuote();
    console.log('whoops, no quote', error);
  }
}

// On Load
getQuote();
