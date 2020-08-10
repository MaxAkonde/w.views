
function handleSubmit(event) {
    event.preventDefault();
    const input = document.querySelector('#searchForm-input').value;
    const searchQuery = input.trim();
    fetchResultats(searchQuery);
}

function fetchResultats(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    //console.log(endpoint);
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            const results = data.query.search;
            displayResults(results);
        });
}

function displayResults(results) {
    //console.log(results);
    const searchResults = document.querySelector('.searchResults');
    searchResults.innerHTML = '';
    results.forEach(result => {
        const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

        searchResults.insertAdjacentHTML('beforeend',
            `<article>
                <h4><a href="${url}" target = "_blank" rel="noopener">${result.title}</a></h4>
                <p>
                    ${result.snippet}
                </p>
                <small>${url}</small>
            </article>`
        );
    });
}

const form = document.querySelector('#searchForm');
form.addEventListener('submit', handleSubmit);
