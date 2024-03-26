searchButton = document.querySelector('button')
searchInput = document.querySelector('input')

var prevSearch = false;


function searchQuery(){
        const query = searchInput.value
        searchResults = axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then((response) => {
            if (prevSearch){
                document.querySelector('#results').innerHTML = ''
            }
            prevSearch = true
            console.log(response.data)
            for (let i = 0; i < response.data.length; i++){
                const show = response.data[i].show
                newShow = document.createElement('div')
                newShow.classList.add('show')
                newShow.innerHTML = `<img src="${show.image.medium}">
                                    <h2>${show.name}</h2>`
                document.querySelector('#results').appendChild(newShow)
            }
        })
}

function moreInfo(){
    const query = searchInput.value
    searchResults = axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then((response) => {
        const name = response.data.show;
        const score = response.data.score;
        const summary = response.data.summary;
        const image = response.data.image.medium;
    })
}
searchButton.addEventListener('click', searchQuery)
document.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        searchQuery()
    }
})

