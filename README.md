# Socket.io-based Chat App

### The app provides chat functionality and supports multiple rooms and users.
_________

#### Architecture of the app

The server is implemented using [Socket.io](https://socket.io) and [Express.js](http://expressjs.com) Node.js packages. The client uses Socket.io, [jQuery](http://jquery.com) and [Bootstrap](https://getbootstrap.com) for CSS. [Moment.js](https://momentjs.com) was used for timestamps.

#### App flow

1. `index.html` will open by default. Enter the name to be displayed and the room name you wish to join.
2. Click 'Submit' in below the message text field or 'Show room users' in order to see all active users in the given room.
3. 'Change settings' can be clicked at the top of the page to leave the room.

#### The app will notify the user if:

1. User joined/left a room.
2. Message was received.

#### To run:
Go to https://yos-socket.herokuapp.com or run the server locally by running `npm i && npm start` from Terminal to start the server and go to `http://localhost:3000` on the browser. The port can be changed in `server.js`. Chrome and Safari browsers are supported, optimal client performance on other browsers is not guaranteed.

#### Main challenge

The main challenge was to use socket events in order to set up the chat experience. Client appearance was of lesser concern therefore the chat website looks very basic. 

The app is part of the Node.js developer course project from Udemy.