const $ = document.querySelector.bind(document);
/** @type {HTMLVideoElement} */
const localVideo = $("#local");
/** @type {HTMLVideoElement} */
const remoteVideo = $("#remote");
/** @type {HTMLInputElement} */
const signalClient = new window["SignalClient"]();

// STREAM LOCAL
let localStream;

/**
 * PEER CONNECTION
 */

const localPeerConnection = new webkitRTCPeerConnection({
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
});

/**
 * Llamar a otro Peer.
 *	- 1. Crear una oferta
 *	- 2. Guardarla en el peer local
 *	- 3. Enviarla a traves de Signaling a los demás peers
 */
const call = async () => {
  const offer = await localPeerConnection.createOffer();
  console.log("#call", { offer });
  localPeerConnection.setLocalDescription(offer);

  signalClient.sendMessage({
    ...localPeerConnection.localDescription.toJSON()
  });
};

/**
 * Responder a una oferta.
 * - Si hay un ICE Cantidate
 * 	- Añadirlo al Peer local
 * - Si es una oferta
 * 	1. Agregar descripción del peer remoto
 * 	2. Crear respuesta
 * 	3. Guardar descripción local
 * 	4. Hacer signaling con respuesta
 * - Si es una respuesta
 * 	- Agregar descripción del peer remoto
 * @param {object} param
 * @param {string} param.sdp
 */
const answer = async ({ ice, sdp, type }) => {
  if (ice) {
    await localPeerConnection.addIceCandidate(new RTCIceCandidate(ice));
  } else if (type === "offer") {
    await localPeerConnection.setRemoteDescription(
      new RTCSessionDescription({
        sdp,
        type
      })
    );

    const ans = await localPeerConnection.createAnswer();
    await localPeerConnection.setLocalDescription(ans);

    await signalClient.sendMessage({
      ...localPeerConnection.localDescription.toJSON()
    });
  } else if (type === "answer") {
    await localPeerConnection.setRemoteDescription(
      new RTCSessionDescription({
        sdp,
        type
      })
    );
  }
};

/**
 * Cuando se encuentran candidatos ICE
 */
localPeerConnection.addEventListener("icecandidate", ev => {
  console.log("#onicecandidate", { candidate: ev.candidate });

  if (ev.candidate) {
    signalClient.sendMessage({
      ice: ev.candidate.toJSON()
    });
  } else {
    console.log("#onincecandidate DONE");
  }
});

/**
 * Cuando han llegado nuevos tracks al Peer
 */
localPeerConnection.addEventListener("track", ev => {
  console.log("#ontrack", { track: ev.track });
  remoteVideo.srcObject = ev.streams[0];

  $("#remote-container").removeAttribute("hidden");
});

/**
 * MEDIA STREAM
 */

/**
 * El navegador pide el permiso para acceder a la cámara. Si es aceptado,
 * se retorna un `MedianStream`, que se pasa al `<video>` a través del
 * atribujo `srcObject`.
 */
navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: true
  })
  .then(stream => {
    $("#local-container").removeAttribute("hidden");
    localVideo.srcObject = stream;
    return stream;
  })
  .then(stream =>
    stream
      .getTracks()
      .forEach(track => localPeerConnection.addTrack(track, stream))
  );

signalClient.listenMessage(msg => {
  console.log("#newmessage", msg);
  answer(msg);
});
