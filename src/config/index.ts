import dotenv from "dotenv";
dotenv.config();

const config = {
  api: {
    server:
      process.env.NODE_ENV === "production"
        ? "http://10.77.113.1:3006"
        : "localhost:4000",
  },
};

export default config;
