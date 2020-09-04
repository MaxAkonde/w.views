
function handleSubmit(event) {
    event.preventDefault();
    var input = document.querySelector('#searchForm-input').value;
    var searchQuery = input.trim();
    fetchResultats(searchQuery);
}

function fetchResultats(searchQuery) {
    var endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    //console.log(endpoint);
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            var results = data.query.search;
            displayResults(results);
        });
}

function displayResults(results) {
    //console.log(results);
    var searchResults = document.querySelector('.searchResults');
    searchResults.innerHTML = '';
    results.forEach(result => {
        var url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);

        searchResults.insertAdjacentHTML('beforeend',
            `<article class="mb-1">
                <h4><a href="${url}" target = "_blank" rel="noopener">${result.title}</a></h4>
                <p>
                    ${result.snippet}
                </p>
            </article>`
        );
    });
}

var form = document.querySelector('#searchForm');
form.addEventListener('submit', handleSubmit);
