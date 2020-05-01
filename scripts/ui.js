class ChatUI {
    constructor(newChat, usernameWrapper) {
        this.newChat = newChat;
    }
    clear() {
        this.newChat.innerHTML = '';
    }
    render(data) {
        const date = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            { addSuffix: true });
        const htmlName = `
        <h4>${localStorage.username ? localStorage.getItem('username') : 'new user'}</h4>
        <i class="fa fa-ellipsis-h"></i>
        `;

        const htmlOther = `
        <div class="new-chat">
        <h6 class="left p-1 px-2 m-2"> <small class="d-block text-muted mt-0">
        ${data.username}</small>${data.message}<small
            class="d-block text-muted mt-2 text-right">${date}</small></h6>
        </div>
        `;
        const html = `
        <div class="new-chat-right">
        <h6 class="right p-1 px-2 m-2">${data.message}<small
        class="d-block text-muted mt-2 text-right">${date}</small></h6>
        </div>
        `;

        if (localStorage.username === data.username) {
            newChat.innerHTML += html;
        } else if (localStorage.username !== data.username) {
            newChat.innerHTML += htmlOther;
        }

        usernameWrapper.innerHTML = htmlName;
    }
}




























// class ChatUI {
//     constructor(list) {
//         this.list = list;
//     }
//     clear() {
//         this.list.innerHTML = '';
//     }
//     render(data) {
//         const date = dateFns.distanceInWordsToNow(
//             data.created_at.toDate(),
//             { addSuffix: true }
//         );
//         const html = `
//         <li class = "list">${data.username} : ${data.message}</li>
//         <div class = "suffix"><small>${date}</small></div>
//         `;
//         this.list.innerHTML += html;

//     }
// }