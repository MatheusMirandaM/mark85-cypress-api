const { MongoClient } = require('mongodb')
const mongoUri = 'mongodb://matheusdb:mklmatheus@ac-qlfi1sm-shard-00-00.8ndjhev.mongodb.net:27017,ac-qlfi1sm-shard-00-01.8ndjhev.mongodb.net:27017,ac-qlfi1sm-shard-00-02.8ndjhev.mongodb.net:27017/?replicaSet=atlas-13fe31-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(mongoUri)

async function connect() {
    await client.connect()
    return client.db('markdb')
}

async function disconnect() {
    await client.disconnect()
}

module.exports = { connect, disconnect }