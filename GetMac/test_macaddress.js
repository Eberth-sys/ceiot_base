const os = require('os');

const interfaces = os.networkInterfaces();
const macAddresses = [];

for (const name in interfaces) {
    for (const net of interfaces[name]) {
        if (net.mac && net.mac !== '00:00:00:00:00:00') {
            macAddresses.push(net.mac);
        }
    }
}

if (macAddresses.length > 0) {
    console.log('MAC addresses:', macAddresses);
} else {
    console.log('No MAC addresses found.');
}


