const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGO_DB_URI


// const MONGODB_URI = process.env.NODE_ENV === 'test'
//     ? process.env.TEST_CLEARDB_URI
//     : process.env.CLEARDB_URI

module.exports = {
	MONGODB_URI,
	PORT
}