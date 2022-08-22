// TODO I: API-request for the recipes
// TODO II: add functionality to "Send invitation"

// mobile-nav
let menuIcon = document.querySelector('.menu-icon');
menuIcon.addEventListener('click', function() {
    let mobileNav = document.querySelector('.mobile-nav_menu-elements-container');
    mobileNav.style.display = (mobileNav.style.display == 'none') ? 'block' : 'none';
});

let inviteBtn = document.querySelector('.invite-friends-button');
inviteBtn.addEventListener('click', function() {
    document.querySelector('.popup').style.display = 'flex';
});

let cancelBtn = document.querySelector('.cancel-button');
cancelBtn.addEventListener('click', function() {
    document.querySelector('.popup').style.display = 'none';
});

let publicBtn = document.querySelector('.public');
publicBtn.addEventListener('click', function() {
    publicBtn.style.backgroundColor = '#018371';
    friendsBtn.style.backgroundColor = '#00d3b7';
    oneFriendBtn.style.backgroundColor = '#00d3b7';
});

let friendsBtn = document.querySelector('.friends');
friendsBtn.addEventListener('click', function() {
    friendsBtn.style.backgroundColor = '#018371';
    publicBtn.style.backgroundColor = '#00d3b7';
    oneFriendBtn.style.backgroundColor = '#00d3b7';
});

let oneFriendBtn = document.querySelector('.one-friend');
oneFriendBtn.addEventListener('click', function() {
    oneFriendBtn.style.backgroundColor = '#018371';
    publicBtn.style.backgroundColor = '#00d3b7';
    friendsBtn.style.backgroundColor = '#00d3b7';
});
