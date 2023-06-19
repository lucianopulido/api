export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || "dev",
  mongodb: process.env.MONGODB_URI || "mongodb://localhost:27017/conexadb",
  port: process.env.PORT || 3001,
});
