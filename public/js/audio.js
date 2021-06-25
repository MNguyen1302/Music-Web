let audio = document.querySelector('#audio');
const playBtns = document.querySelectorAll('.btn-toggle-play');
const repeatBtn = document.querySelector('.btn-repeat');
const progressTotal = document.querySelector('.progress__total')
const progressLevel = document.querySelector('.progress__level');
const current = document.querySelector('.current-time');
const duration = document.querySelector('.duration-time');
const volumeBtn = document.querySelector('.volume-toggle');
const volumeTotal = document.querySelector('.volume-slider__total');
const volumeLevel = document.querySelector('.volume-slider__level');

const app = {
    isPlaying: false,
    isLooping: false,
    isMuted: false,

    handleAudioEvent: function() {
        _this = this;
        var songImage, songName, artistName;
        if (document.querySelector('#song-name') && audio) {
            songImage = document.querySelector('#song-image').src;
            songName = document.querySelector('#song-name').innerHTML;
            artistName = document.querySelector('#song-artist').innerHTML;
            
        } else {
            const currSong = JSON.parse(localStorage.getItem("currSong"));
            document.querySelector('#song-audio').src = currSong["audioFile"];

            audio = document.querySelector('#song-audio');
            audio.currentTime = currSong["currTime"];
            audio.duration = currSong["durationTime"];

            document.querySelector('#song-name2').innerHTML = currSong["songName"];
            document.querySelector('#song-artist2').innerHTML = currSong["artistName"];
            document.querySelector('#song-image2').src = currSong["songImage"];

            songImage = document.querySelector('#song-image2').src;
            songName = document.querySelector('#song-name2').innerHTML;
            artistName = document.querySelector('#song-artist2').innerHTML;
        }

        playBtns.forEach(playBtn => {
            playBtn.onclick = function() {
                if(_this.isPlaying) {
                    audio.pause();
                } else {
                    audio.play();
                }
            }
            audio.onpause = function() {
                _this.isPlaying = false;
                playBtn.classList.remove('playing');
            }

            audio.onplay = function() {
                _this.isPlaying = true;
                playBtn.classList.add('playing');
            }
        })

        repeatBtn.onclick = function() {
            if(_this.isLooping) {
                _this.isLooping = false;
                audio.loop = false;
                repeatBtn.classList.remove('looping');
            } else {
                _this.isLooping = true;
                audio.loop = true;
                repeatBtn.classList.add('looping');
            }
        }
        
        audio.ontimeupdate = function() {
            let currentTime = audio.currentTime;
            let durationTime = audio.duration;
            current.innerHTML = formatTime(currentTime);
            duration.innerHTML = formatTime(durationTime);
            progressLevel.style.width = ((currentTime/durationTime) * 100) + "%"; 
            let song = {
                "songImage": songImage,
                "songName": songName,
                "artistName": artistName,
                "audioFile":  audio.src,
                "currTime": audio.currentTime,
                "durationTime": audio.duration
            };
            localStorage.setItem("currSong", JSON.stringify(song));
        }

        progressTotal.onclick = function(e) {
            audio.currentTime = ((e.offsetX/progressTotal.clientWidth) * audio.duration);
        }

        const formatTime = function(time) {
            let minutes = Math.floor(time / 60);
            let seconds = Math.floor(time % 60);

            if(seconds < 10) {
                return "0" + minutes + ":" + "0" + seconds;
            }
            return "0" + minutes + ":" + seconds;
        }
    },

    handleVolumeEvent: function() {
        _this = this;

        volumeBtn.onclick = function() {
            if(_this.isMuted) {
                _this.isMuted = false;
                volumeLevel.style.width = (audio.volume * 100) + "%"
                volumeBtn.classList.remove('muted');
            } else {
                _this.isMuted = true;
                volumeLevel.style.width = audio.volume + "%";
                volumeBtn.classList.add('muted');
            }
        }

        volumeTotal.onclick = function(e) {
            volumeLevel.style.width = Math.abs((e.offsetX / volumeTotal.offsetWidth) * 100) + "%";
            audio.volume = Math.abs(e.offsetX / volumeTotal.offsetWidth);
        }
    },

    start: function() {
        this.handleAudioEvent();
        this.handleVolumeEvent();
    }
}
app.start();