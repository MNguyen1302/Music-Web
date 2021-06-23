const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const sortDropdown = $('.sort-song-dropdown');
const sortBtn = $('.sort-song-btn');
const sortAZ = $('.sort-a-z');
const sortZA = $('.sort-z-a');

sortBtn.onclick = function() {
    sortDropdown.classList.toggle('show');
}
document.onclick = function(e) {
    if(!sortBtn.contains(e.target)) {
        if(sortDropdown.classList.contains('show')) {
            sortDropdown.classList.toggle('show');
        }
    }
}

const container = $('div.topsong-wrapper');
const songBoxs = Array.from(document.querySelectorAll('.topsong-box'));

sortAZ.onclick = function() {
    const sortSong = songBoxs.sort(function(a, b) {
        let textA = a.getAttribute('data-song').toLowerCase();
        let textB = b.getAttribute('data-song').toLowerCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })
    sortSong.forEach(item => {
        container.appendChild(item);
    })
}

sortZA.onclick = function() {
    const sortSong = songBoxs.sort(function(a, b) {
        let textA = a.getAttribute('data-song').toLowerCase();
        let textB = b.getAttribute('data-song').toLowerCase();
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
    })
    sortSong.forEach(item => {
        container.appendChild(item);
    })
}