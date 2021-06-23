// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

// const tabs = $$('.tab-item');
// const panes = $$('.tab-pane');
// const tabsProfile = $$('.tab-profile-item');
// const panesProfile = $$('.tab-profile-pane');
// const userAvatar = $('.user-avatar');
// const userDropdown = $('.user-dropdown');
// const toggleBars = $('.toggle-bars');
// const sidebar = $('.sidebar');
// const navbar = $('.navbar');
// const contentPage = $('.content-page');
// const toggleBarsResponsive = $('.toggle-bar-responsive');
// const audio = $('#audio');
// const playBtns = $$('.btn-toggle-play');
// const repeatBtn = $('.btn-repeat');
// const progressTotal = $('.progress__total');
// const progressLevel = $('.progress__level');
// const current = $('.current-time');
// const duration = $('.duration-time');
// const volumeBtn = $('.volume-toggle');
// const volumeTotal = $('.volume-slider__total');
// const volumeLevel = $('.volume-slider__level');

const tabs = document.querySelectorAll('.tab-item');
const panes = document.querySelectorAll('.tab-pane');
const tabsProfile = document.querySelectorAll('.tab-profile-item')
const panesProfile = document.querySelectorAll('.tab-profile-pane');
const userAvatar = document.querySelector('.user-avatar');
const userDropdown = document.querySelector('.user-dropdown');
const toggleBars = document.querySelector('.toggle-bars');
const sidebar = document.querySelector('.sidebar');
const navbar = document.querySelector('.navbar');
const contentPage = document.querySelector('.content-page');
const toggleBarsResponsive = document.querySelector('.toggle-bar-responsive');
const audio = document.querySelector('#audio');
const playBtns = document.querySelectorAll('.btn-toggle-play');
const repeatBtn = document.querySelector('.btn-repeat');
const progressTotal = document.querySelector('.progress__total')
const progressLevel = document.querySelector('.progress__level');
const current = document.querySelector('.current-time');
const duration = document.querySelector('.duration-time');
const volumeBtn = document.querySelector('.volume-toggle');
const volumeTotal = document.querySelector('.volume-slider__total');
const volumeLevel = document.querySelector('.volume-slider__total');

const app = {
    isPlaying: false,
    isLooping: false,
    isMuted: false,

    handleUI: function() {

        // Tabs Trending
        tabs.forEach((tab ,index) => {
            tab.onclick = function(e) {
                const pane = panes[index];

                // $('.tab-item.active').classList.remove('active');
                // $('.tab-pane.active').classList.remove('active');
                document.querySelector('.tab-item.active').classList.remove('active');
                document.querySelector('.tab-pane.active').classList.remove('active');

                this.classList.add('active');
                pane.classList.add('active')
            }
        });

        // Tabs Profile
        tabsProfile.forEach((tabProfile, index) => {
            tabProfile.onclick = function() {
                const paneProfile = panesProfile[index];
                // $('.tab-profile-item.active').classList.remove('active');
                // $('.tab-profile-pane.active').classList.remove('active');
                document.querySelector('.tab-profile-item.active').classList.remove('active');
                document.querySelector('.tab-profile-pane.active').classList.remove('active');

                this.classList.add('active');
                paneProfile.classList.add('active')
            }
        })

        // Toggle Bars
        
        if(screen.width > 1300) {
            toggleBars.onclick = function() {
                sidebar.classList.toggle('active');
                navbar.classList.toggle('active');
                contentPage.classList.toggle('active');
            }   
        } else {
            toggleBars.onclick = function() {
                sidebar.classList.toggle('open');
            }
        }
        toggleBarsResponsive.onclick = function() {
            sidebar.classList.toggle('open');
        }

        // Dropdown user
        if(userAvatar) {
            userAvatar.onclick = function() {
                userDropdown.classList.toggle('show');
            }
            document.onclick = function(e) {
                if(!userAvatar.contains(e.target)) {
                    if(userDropdown.classList.contains('show')) {
                        userDropdown.classList.toggle('show');
                    }
                }
            }
        }
        
    },

    handleAudioEvent: function() {
        _this = this;
        
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
        this.handleUI();
        this.handleAudioEvent();
        this.handleVolumeEvent();
    }
}
app.start();