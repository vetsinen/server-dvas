const faker = require("faker")
const {MongoClient} = require('mongodb')
const url = 'mmongodb+srv://superadmin:ZGc2VVJxaEFpU3VETThBL3hOWHFGUT09@dvas-cluster0.o1qow.mongodb.net/main?retryWrites=true&w=majority'
const client = new MongoClient(url)
const dbName = 'main'

const EventsNumber = 4 //60*50000-20000
const startDate = "2021-05-01"
const endDate = "2021-08-10"

seedDB()

async function seedDB() {
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection('events')

    for (let i = 1; i <= EventsNumber; i++) {
        await collection.insertOne({...fakeEvent(),...{event_id: i}})
    }
    console.log('Inserted documents =>')
    client.close()
}

function fakeEvent(){
    const lane_id = randomIntFromInterval(1,256)
    let e = {
        ...refEvent,
        ...{event_timestamp: faker.date.between(startDate, endDate)},
        ...{event_guid: faker.datatype.uuid(),lane_id, lane_name: 'lane '+lane_id}
    }
    e.licence_plates[0].licence_plate_read.plate_read = faker.git.shortSha().toUpperCase()
    return e
}

let refEvent = {
    "event_guid": "22b6a74f-69e1a7f7-de16c02c-bc9c684c-20201207131248000",
    "event_id": "4",
    "event_timestamp": "2020-12-07T15:16:48+04:00",
    "images": [
        {
            "camera_id": 1,
            "camera_name": "2",
            "image_data": "<jpeg data base64 encoded>",
            "image_encoding": "jpg",
            "image_guid": "4a437cbb-234f7924-2395ba7f-1f9c5bb4-20201207131248000",
            "image_timestamp": "2020-12-07T15:16:48+04:00"
        },
        {
            "camera_id": 1,
            "camera_name": "2",
            "image_data": "<jpeg data base64 encoded>",
            "image_encoding": "jpg",
            "image_guid": "45ae2a5a-4c19ffb5-39ec172c-9d29d2d0-20201207131248000",
            "image_timestamp": "2020-12-07T15:16:48+04:00"
        }
    ],
    "lane_id": 123,
    "lane_name": "lane 123",
    "licence_plates": [
        {
            "licence_plate_front_rear": "front",
            "licence_plate_guid": "45ae2a5a-4c19ffb5-39ec172c-9d29d2d0-20201207131248000",
            "licence_plate_image": {
                "image_guid": "45ae2a5a-4c19ffb5-39ec172c-9d29d2d0-20201207131248000"
            },
            "licence_plate_read": {
                "confidence": 98,
                "plate_read": "UYT7192"
            }
        }
    ],
    "vehicle": {
        "vehicle_guid": "d4c9a32c-ac5f5c6c-d13bb780-ee8a3813-20201207131248000"
    }
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}