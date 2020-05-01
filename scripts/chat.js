class ChatRoom {
    constructor(username, room) {
        this.username = username;
        this.room = room;
        this.coll = db.collection('chats');
        this.unsubscribe;
    }
    async addChat(message) {
        const now = new Date();
        const chat = {
            username: this.username,
            room: this.room,
            message: message,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        const response = await this.coll.add(chat);
        return response;
    }
    getChat(callback) {
        this.unsubscribe = this.coll
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snap => {
                snap.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        callback(change.doc.data());
                    }
                });
            });
    };
    updateUsername(username) {
        this.username = username;
        console.log('username updated');
        localStorage.setItem('username', username);
    };
    updateRoom(room) {
        this.room = room;
        console.log('room updated');
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}




















