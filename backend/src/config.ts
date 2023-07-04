import 'dotenv/config'

export default {
  MONGODB_URI: process.env.MONGODB_URI as string,
  PORT: process.env.PORT
}
