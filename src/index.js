// src/index.js
const { BlobServiceClient } = require("@azure/storage-blob");

const url = "<url with sas token>";
const client = new BlobServiceClient(url);

// Now do something interesting with BlobServiceClient

async function listing() {
    for await (const container of client.listContainers()) {
        console.log(container.name)
    }
}

client.getProperties().then(properties => {
    console.log(properties);

    listing().catch(error => {
        console.log(error)
    });
})

