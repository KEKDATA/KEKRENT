import ky from "ky-universal";

export const apiConfig = ky.create({ prefixUrl: "http://localhost:3000" });
