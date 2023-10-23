// Euan Chree
// 1912490

// Config for the backend
const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 8000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || "mongodb://" + (process.env.IP || "localhost") + ":" + (process.env.MONGO_PORT || "27017")+"/mydb/",
    juniorPay: process.env.JUNPAY || 15,
    standardPay: process.env.STANPAY || 20,
    seniorPay: process.env.SENPAY || 25
}

export default config;