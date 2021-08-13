const {MongoClient} = require('mongodb')
const url = 'mmongodb+srv://superadmin:ZGc2VVJxaEFpU3VETThBL3hOWHFGUT09@dvas-cluster0.o1qow.mongodb.net/main?retryWrites=true&w=majority'
const client = new MongoClient(url)
const dbName = 'main'
// console.log(getEvents())

// const filter1 = {"event_timestamp":{$gte:new ISODate("2021-07-14T12:12:21Z"),$lte:new ISODate("2021-07-14T12:59:21Z")}}
// const filter2 = {"licence_plates.licence_plate_read.plate_read" : "E9FB038"}

async function getEvents(){
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection('events')

    const e = await collection.find({}).limit(5).toArray()
    client.close()
    return await e
}

module.exports = getEvents