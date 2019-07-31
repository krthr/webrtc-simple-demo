# WebRTC: ¿y si hacemos un Skype?
![title](https://www.3cx.es/wp-content/uploads/sites/19/webrtcfig.png)

***

![title](https://avatars0.githubusercontent.com/u/18665740?s=100&v=4)
## Wilson Tovar
7mo semestre - Ing. De Sistemas  
Full Stack Dev @ [Fontumi](https://www.fontumi.co)

*[github](https://github.com/krthr), [linkedin](www.linkedin.com/in/wilsontovar),  [instagram](https://www.instagram.com/wilson_tovar_/), [correo](mailto:twilson@uninorte.edu.co)*

***

## Índice
1. Introducción
2. WebRTC y su magia 
3. Empezando
4. ¡Hola mundo! 
5. ¿Y ahora qué?  
6. *Reto* 😯

***

## 1. Introducción

> ["WebRTC is an open source project to enable realtime communication of audio, video and data in Web and native apps."](https://codelabs.developers.google.com/codelabs/webrtc-web/#0)

***

## 2. WebRTC y su magia

- Open Source
- Peer-Peer simplificado
- Bajo ancho de banda y latencia
- Transmisión segura de datos
- [*Ampliamente soportado](https://caniuse.com/#search=webrtc)

***

### Pero... ¿para qué sirve?

- Transmisión de audio y video
- Intercambio de archivos
- Interface con sistemas telefónicos usando señales DTMF
- Mensajes en tiempo real
- Edición de documentos en tiempo real

***

## 3. Ahora sí, ¡a usarlo!

***

#### Alto ahí... ¡Primero la teoría!

![title](https://media0.giphy.com/media/nqLx2eMSgVsre1SO9b/giphy.gif?cid=790b76115d40c8ca6d37373255deb7f4&rid=giphy.gif)

***

### APIs
- MediaStream (commonly known as getUserMedia)
- RTCPeerConnection

***

- **MediaStream.** Acceder a la cámara y micrófono.
  - *getUserMedia()*
  - HTTPS
  - Chrome, Firefox, Opera

- **RTCPeerConnection.** Responsable de manejar la comunicación eficiente y estable de streams entre peers.
  - Google, Opera: *WebkitRTCPeerConnection*
  - Firefox: *mozRTCPeerConnection*

***

### ¡Peer-to-peer, pero se necesitan servidores!
#### PD: ICE

![title](https://i.giphy.com/media/l3q2K5jinAlChoCLS/giphy.webp)

***

#### Interactive Connectivity Establishment (ICE) 
Framework que permite que los navegadores conecten los peers. ICE usa servidores STUN y/o TURN.

***

- **STUN (Session Traversal Utilities for NAT).** Descubrir la IP pública y descubrir restricciones.
  - Poco ancho de banda

![title](https://mdn.mozillademos.org/files/6115/webrtc-stun.png)

***

- **TURN (Traversal Using Relays around NAT).** Se usa cuando no hay alternativas.

![title](https://mdn.mozillademos.org/files/6117/webrtc-turn.png)

***

### Session Description Protocol (SDP)
Describe el contenido multimedia como los formatos, codecs, etc. En otras palabras, es el metadata que describe el contenido.

***

### Signaling
Intercambio de mensajes de control entre los peers.
- Podemos usar lo que queramos

***

## 4. [¡Hola mundo!](https://webrtc-demo-simple.web.app/?room=) https://bit.ly/2KcbnSF

![title](https://giphygifs.s3.amazonaws.com/media/13HgwGsXF0aiGY/giphy.gif)

 > Para usar el demo, agrega un id único al final de `?room=` y dáselo a otra persona para hacer una vídeo llamada

***

## 5. ¿Y ahora qué?

1. [WebRTC Página oficial](https://webrtc.org/)  
2. [Real time communication with WebRTC](https://codelabs.developers.google.com/codelabs/webrtc-web/#0)
3. Recursos en línea
  - [Numb is a STUN/TURN server](http://numb.viagenie.ca/)
  - [Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)

***

# Reto 😯
- Sala multiusuarios
- Envío de archivos

***

# ¡Gracias! 💖