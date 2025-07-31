import { MongoClient, ServerApiVersion} from "mongodb";

const uri = process.env.ATLAS_URI || "";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

try { //Connect the client to the server
    await client.connect(); 
    await client.db("admin").command({ ping: 1});
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
} catch (error) {
    console.error(error.message);
}


let db = client.db("employees");

export default db;