searchButton = document.querySelector('button')
searchInput = document.querySelector('input')

function searchQuery(){
        const query = searchInput.value
        searchResults = axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then((response) => {
            console.log(response.data)
            for (let i = 0; i < response.data.length; i++){
                const show = response.data[i].show
                newShow = document.createElement('div')
                newShow.innerHTML = `<img src="${show.image.medium}">
                                    <h2>${show.name}</h2>`
                document.querySelector('#results').appendChild(newShow)
            }
        })
}

searchButton.addEventListener('click', searchQuery)