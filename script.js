searchButton = document.querySelector('button')
searchInput = document.querySelector('input')

var prevSearch = false;
var sideWindow = false;

function searchQuery(){
        const query = searchInput.value
        searchResults = axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then((response) => {
            if (prevSearch){
                document.querySelector('#results').innerHTML = ''
                prevSearch = false
            }
            if(sideWindow){
                document.querySelector('.moreInfo').remove()
                sideWindow = false
            }
            prevSearch = true
            document.querySelector('#result-box').style.borderStyle = 'dashed';
            console.log(response.data)
            for (let i = 0; i < response.data.length; i++){
                const show = response.data[i].show
                newShow = document.createElement('div')
                newShow.id = show.id
                newShow.classList.add('show')
                var image = show.image.medium;
                if (image === null){
                    image = 'https://via.placeholder.com/210x295'
                }
                newShow.innerHTML = `<img src="${image}">
                                    <h2>${show.name}</h2>`
                document.querySelector('#results').appendChild(newShow)
            }
        })
}

function moreInfo(showID){
    if (sideWindow){
        document.querySelector('.moreInfo').remove()
    }
    var name, rating, summary, image;
    searchResults = axios.get(`https://api.tvmaze.com/shows/${showID}`)
    .then((response) => {
        console.log(response)
        sideWindow = true;
        name = response.data.name;
        summary = response.data.summary;
        image = response.data.image.medium;
        moreInfoWindow = document.createElement('div')
        moreInfoWindow.id = 'moreInfo'
        moreInfoWindow.innerHTML = `<h2>${name}</h2>
                                
                                    <img src="${image}">
                                    <p>${summary}</p>`
        moreInfoWindow.classList.add('moreInfo')
        document.querySelector('#result-box').appendChild(moreInfoWindow)
    })

    
}
//searching for shows 
searchButton.addEventListener('click', searchQuery)
document.addEventListener('keypress', function(e){
    if (e.key === 'Enter'){
        searchQuery()
    }
})

//expanding show details
document.getElementById('results').addEventListener('click', function(e){
    if (e.target.parentElement.classList.contains('show')){
        var showID = e.target.parentElement.id
        moreInfo(showID)
    }
})
