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

const appUI = {

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

    start: function() {
        this.handleUI();
    }
}
appUI.start();