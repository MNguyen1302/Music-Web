const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$('.tab-item');
const panes = $$('.tab-pane');
const tabsProfile = $$('.tab-profile-item');
const panesProfile = $$('.tab-profile-pane');
const userAvatar = $('.user-avatar');
const userDropdown = $('.user-dropdown');
const toggleBars = $('.toggle-bars');
const sidebar = $('.sidebar');
const navbar = $('.navbar');
const contentPage = $('.content-page');

const app = {

    handleUI: function() {
        // Tabs Trending
        tabs.forEach((tab ,index) => {
            tab.onclick = function(e) {
                const pane = panes[index];

                $('.tab-item.active').classList.remove('active');
                $('.tab-pane.active').classList.remove('active');

                this.classList.add('active');
                pane.classList.add('active')
            }
        });

        // Tabs Profile
        tabsProfile.forEach((tabProfile, index) => {
            tabProfile.onclick = function() {
                const paneProfile = panesProfile[index];
                $('.tab-profile-item.active').classList.remove('active');
                $('.tab-profile-pane.active').classList.remove('active');

                this.classList.add('active');
                paneProfile.classList.add('active')
            }
        })

        // Toggle Bars
        toggleBars.onclick = function() {
            sidebar.classList.toggle('active');
            navbar.classList.toggle('active');
            contentPage.classList.toggle('active');
        }

        // Dropdown user
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

    },

    start: function() {
        this.handleUI();
    }
}
app.start();