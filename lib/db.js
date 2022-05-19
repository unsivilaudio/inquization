const mongoose = require('mongoose');

let client;

export async function connectToDatabase() {
    if (!client || !mongoose.connection) {
        await mongoose.connect('mongodb://127.0.0.1:27017/schwizz').then(() => {
            client = mongoose.connection;
        });

        client.on('close', () => {
            client = null;
        });
    }

    return client;
}
