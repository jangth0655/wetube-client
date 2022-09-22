const BASE_URL = process.env.NEXT_PUBLIC_LOCAL_SERVER;
process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_SERVER
  : process.env.NEXT_PUBLIC_LOCAL_SERVER;

export default BASE_URL;
