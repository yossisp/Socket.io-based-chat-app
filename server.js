'use strict';

const express = require('express');
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io') (http);
const moment = require('moment');
const EVENTS = require('./public/js/constants.js');
const DEFAULT_NAME = 'System';
const LEFT_ROOM_MSG = ' left the room';
const JOINED_MSG = ' has joined!';
const WELCOME_MSG = 'Welcome to chat application!';
const CURRENT_USERS = 'Current users: ';
const clientInfo = {};

function sendCurrentUsers(socket) {
    const info = clientInfo[socket.id];
    const users = [];

    if(typeof info === 'undefined') {
        return;
    }

    Object.keys(clientInfo).forEach(socketId => {
        const userInfo = clientInfo[socketId];
        if(userInfo.room === info.room) {
            users.push(userInfo.name);
        }
    });
    socket.emit(EVENTS.MESSAGE, getMessage(CURRENT_USERS + users.join(', ')));
}

function getMessage(text, name = DEFAULT_NAME) {
    return {
        name: name,
        text: text,
        tm: moment.valueOf()
    }
}

app.use(express.static(__dirname + '/public'));

io.on(EVENTS.CONNECTION, socket => {
    socket.on(EVENTS.DISCONNECT, () => {
        const userData = clientInfo[socket.id];
       if(typeof userData !== 'undefined') {
           socket.leave(userData.room);
           io.to(userData.room).emit(EVENTS.MESSAGE, getMessage(userData.name + LEFT_ROOM_MSG));
           delete clientInfo[socket.id];
       }
    });

    socket.on(EVENTS.JOIN_ROOM, request => {
        clientInfo[socket.id] = request;
        socket.join(request.room);
        socket.broadcast.to(request.room).emit(EVENTS.MESSAGE, getMessage(request.name + JOINED_MSG));
    });

    socket.on(EVENTS.MESSAGE, message => {
        message.tm = moment.valueOf();
        io.to(clientInfo[socket.id].room).emit(EVENTS.MESSAGE, message);
    });

    socket.on(EVENTS.SHOW_USERS, () => {
        sendCurrentUsers(socket);
    });

    socket.emit(EVENTS.MESSAGE, getMessage(WELCOME_MSG));
});

http.listen(PORT, () => {
    console.log('Server started!');
});