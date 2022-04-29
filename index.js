const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ye9by.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        await client.connect();
        const itemCollection = client.db('fruitsWarehouse').collection('item');

        //POST
        app.post('/item', async (req, res) => {
            const newItem = req.body;
            const result = await itemCollection.insertOne(newItem);
            res.send({
                success: true,
                message: `Successfully inserted ${product.name}!`,
            });
        });
    } finally {
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Fruits Warehouse Running');
});

app.listen(port, () => {
    console.log('Listening to port', port);
});
