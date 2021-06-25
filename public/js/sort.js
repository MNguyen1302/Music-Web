const sortDropdown = document.querySelector('.sort-song-dropdown');
const sortBtn = document.querySelector('.sort-song-btn');
const sortAZ = document.querySelector('.sort-a-z');
const sortZA = document.querySelector('.sort-z-a');

sortBtn.onclick = function() {
    sortDropdown.classList.toggle('show');
}
window.onclick = function(e) {
    if(!sortBtn.contains(e.target)) {
        if(sortDropdown.classList.contains('show')) {
            sortDropdown.classList.toggle('show');
        }
    }
}

const container = document.querySelector('.topsong-wrapper');
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