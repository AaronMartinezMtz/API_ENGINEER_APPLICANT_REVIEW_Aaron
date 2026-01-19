require('dotenv').config();
let socket = require('socket.io-client');
const HOSTNAME = process.env.HOSTNAME
const PORT = process.env.PORT 
const TOPIC = "iot/sensors";

let LAST_HUM = 50;
let LAST_TEMP = 17.5;

const TEMP_LIMITS = [10, 25];
const HUM_LIMITS = [30, 70];

socket = socket("http://" + HOSTNAME + ":" + PORT);

socket.on('connect_error', (error) => {
    console.log("socket error", error);
});

socket.on('connect', function() {
    console.log("socket connected", socket.id);
    setInterval(() => {
        getDataAndSend();
    }, 10000);
});

function getDataAndSend() {
    socket.emit('iot/sensors', {
        sensor: "HUM",
        value: generateData("HUM")
    });
    socket.emit('iot/sensors', {
        sensor: "TEMP",
        value: generateData("TEMP")
    });    
}

function generateData(type) {        
    let sig = Math.random() > .5 ? 1 : -1;
    let value = sig * parseFloat(Math.random().toFixed(1));
    if (type == "TEMP") {
        if (LAST_TEMP + value >= TEMP_LIMITS[0] && LAST_TEMP + value <= TEMP_LIMITS[1]) LAST_TEMP += value;
        else LAST_TEMP -= value;    
        return LAST_TEMP;
    }
    if (type == "HUM") {
        if (LAST_HUM + value >= HUM_LIMITS[0] && LAST_HUM + value <= HUM_LIMITS[1]) LAST_HUM += value;
        else LAST_HUM -= value;
        return LAST_HUM;
    }
    return 0;
}