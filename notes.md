hardware will send

- room
- key

hardware will receive

- code
- title
- user : user id
- room : id
- type : regular or exception
- date
- time : { day , timeIn , timeOut}
- createdAt:
- updatedAt:

prompt

i have a lock (hardware) the needs a code to open
i have a web app that sets schedules for classroom
the lock, locks the room and can only be accessed by the person scheduled for that room

i have this

the client will send this to api 1

    code : number used to unlock the lock
    key : used to authenticate
    title
    user : user id
    room : room id
    type : regular or exception
    date
    time : { day , timeIn , timeOut}

hardware will send

    room number
    key : used to authenticate

hardware will receive these from the api as json

    code : number used to unlock the lock
    key: use for auth
    title
    user : user id
    room : room id
    type : regular or exception
    date
    time : { day , timeIn , timeOut}
    createdAt:
    updatedAt:

this is just for testing so make me 2 api, the first api will receive data from client, that data will be saved to the db, then the 2nd api is the one that the hardware will access which returns the data from the db
dont encrypt it is just for testing
use only one schema and put it in separate file

{
code: number used to unlock the lock
key: use for auth
title: {
type: String,
required: true,
},
user: user id,
room: room id,
type: {
type: String,
enum: ["regular", "exception"],
required: true,
},
date: {
type: Date,
},
time: [
{
day: {
type: String,
enum: [
"monday",
"tuesday",
"wednesday",
"thursday",
"friday",
"saturday",
"sunday",
],
},
timeIn: {
type: String,
required: true,
},
timeOut: {
type: String,
required: true,
},
},
],
},
{ timestamps: true },
);
