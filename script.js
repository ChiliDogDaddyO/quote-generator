const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuoteFromAPI() {
  showLoadingSpinner();
  // We need to use a Proxy URL to make our API call in order to avoid a CORS error
  const proxyUrl = 'https://calm-brushlands-78577.herokuapp.com/';
  const apiUrl =
    'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    // fetch info: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // If Author is blank, add 'Unknown'
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Reduce fontsize for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (error) {
    getQuoteFromAPI();
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuoteFromAPI);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuoteFromAPI();
