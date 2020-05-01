// dom querying
const newChat = document.querySelector('.new-chat-wrapper');
const sendForm = document.querySelector('.send');
const loginForm = document.querySelector('.login');
const usernameWrapper = document.querySelector('.username-wrapper');
const dialogs = document.querySelector('.dialogs');
const darkMode = document.querySelector('#sel1');


// dark mode apply
darkMode.addEventListener('click', e => {
    if (e.target.value === 'darkmode') {
        document.documentElement.style.setProperty('--white', '#000');
        document.documentElement.style.setProperty('--pinkish', '#a12c34');
        localStorage.setItem('darkmode', e.target.value);
    } else {
        document.documentElement.style.setProperty('--white', '#fff');
        document.documentElement.style.setProperty('--pinkish', '#ff97a0');
        // localStorage.setItem('lightmode', e.target.value);
    };
    // localStorage.darkmode ? localStorage.darkmode : localStorage.lightmode;
})

//save username  from login page
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = loginForm.username.value.trim();
    const room = loginForm.sel1.value;
    // localStorage.setItem('room', room);
    chatroom.updateUsername(username);
    chatui.clear();
    loginForm.reset();
});
const localName = localStorage.username ? localStorage.username : 'user';
// const localName = localStorage.username ? localStorage.username : 'user';
//obj instances
const chatroom = new ChatRoom(localName, 'react');
const chatui = new ChatUI(newChat);
chatroom.getChat(data => chatui.render(data));

sendForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = sendForm.msg.value.trim();
    chatroom.addChat(msg)
        .then(sendForm.reset())
        .catch(err => console.log(err));
})

// update the room
dialogs.addEventListener('click', e => {
    if (e.target.tagName === 'H3') {
        chatui.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChat(chat => chatui.render(chat));
    }
})
