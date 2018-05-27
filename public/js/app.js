'use strict';

import {getQueryVariable} from './queryParams.js';

const ANONYMOUS = 'Anonymous';
const room = getQueryVariable('room') || ANONYMOUS;
const name = getQueryVariable('name') || ANONYMOUS;
const socket = io();
const SPACE = ' ';
const FADE_TIME = 150;
const $roomTitle = jQuery('.room-title');
const $form = jQuery('#message-form');

const EVENTS = {
    CONNECTION: 'connection', //our app specific event
    MESSAGE: 'message',
    JOIN_ROOM: 'joinRoom',
    DISCONNECT: 'disconnect',
    CLICK: 'click',
    SHOW_USERS: 'showUsers',
    SUBMIT: 'submit',
    CONNECT: 'connect' //internal socket.io event
};
Object.freeze(EVENTS);

$roomTitle.text(room);

socket.on(EVENTS.CONNECT, () => {
    socket.emit(EVENTS.JOIN_ROOM, {
        name: name,
        room: room
    });
});

socket.on(EVENTS.MESSAGE, message => {
    const tm = moment.utc(message.tm).local().format('h:mm a');
    const $messages = jQuery('.messages');
    const $message = jQuery('<li class="list-group-item"></li>');
    $message.append('<p><strong>' + message.name + SPACE + tm + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');
    $message.hide().fadeIn(FADE_TIME);
    $message.prependTo($messages);
});

$form.on(EVENTS.SUBMIT, event => {
    event.preventDefault();

    const $messageForm = $form.find('input[name=message]');
    if($messageForm.val() !== SPACE) {
        socket.emit(EVENTS.MESSAGE, {
            text: $messageForm.val(),
            name: name
        });
        $messageForm.val(SPACE);
    }
});

document.getElementById('showUsersButton').addEventListener(EVENTS.CLICK, () => {
    socket.emit(EVENTS.SHOW_USERS);
});