function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxx".replace(/[xy]/g, function(c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });

  return uuid;
}
// Initialize Firebase
const app = firebase.initializeApp({
  apiKey: "AIzaSyAWxAamdNgk-5z2BoLtlPBMeeUJypK8i5U",
  authDomain: "webrtc-demo-simple.firebaseapp.com",
  databaseURL: "https://webrtc-demo-simple.firebaseio.com",
  projectId: "webrtc-demo-simple",
  storageBucket: "",
  messagingSenderId: "618160615452",
  appId: "1:618160615452:web:e2a37da6cebd4224"
});
const rooms = app.firestore().collection("rooms");

/**
 * Singal - Enviar y escuchar mensajes de Firestore
 */
class Signal {
  constructor() {
    const urlQuery = new URLSearchParams(window.location.search);
    this.roomId = urlQuery.get("room");
    this.myId = create_UUID();
    this.messages = rooms.doc(this.roomId).collection("messages");
  }

  /**
   * Escuchar a nuevos mensajes en el room.
   * @param {void} cb
   */
  listenMessage(cb) {
    return this.messages.onSnapshot(snap => {
      snap.docChanges().forEach(change => {
        const data = change.doc.data();
        if (change.type === "added" && data.from != this.myId) {
          cb(change.doc.data());
        }
      });
    });
  }

  /**
   * Enviar mensaje
   * @param {object} msg
   */
  async sendMessage(msg) {
    await this.messages.add({
      from: this.myId,
      ...msg
    });
  }
}

window["SignalClient"] = Signal;
