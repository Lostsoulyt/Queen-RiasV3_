const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0kyNjNzcWl2RFBtMDBaTlc1T2R3elVJVVZMbnc4RFJabHpoRUxuZXlsQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNDFWWkRtUXdIRlB4U3IvNVR1NHR4bFprNFJ4TUJPNUFiMm1DNnExTnhFND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhQkdUNE51VzJhRVdhQVZGSXFlSUFMUnRORnBrYzRZNGF1SDdvL3p0YzJVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMdU1TbFVSdmlteHpBSjJRZ1ZOSlBzVWtyMFkycHJkOU5vNGkvbTBQdjE0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhCOEtqYmpqZmkrRkc1WkUxVm5ZcjlUWllUamlRN2x1RW1XT2JjL3BpV289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imp2WEhla2lJd2NBdjZOdmVXTXliNTgyMXBVZWg3MUJGc052L3RsUVJka0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0J6WUp0TFVkeTF5VjFMTzlGc3E3b3hJblgvajVBWllVTEZsK2VCYmQzVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTHhxZVh6T0FEU0JDMDBRSjNmUGdIS1psSDBtMkZRd1dCaW9NRVpJQmVpMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxoMXY5dnd4RHRmcGUwNWhQaEt3a1loT3UwM2F0MmRjenNxL2lLcTNFRWZORlJSSElnM0E0U2JBV0JhdjUyQ2F4ZmZKVlVNRkRpT0lUMVVrVWxxc2dnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQyLCJhZHZTZWNyZXRLZXkiOiJMQk9hdUFYV0tlQWdGU05vcUl4OXVSQzU3NnlOVU1odFprUWpPOUgyZXVZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJCSFdLWUtSQSIsIm1lIjp7ImlkIjoiMjM0OTEzMTgwNDU5MzoyNkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjM4MzQ1ODg3NTEwNTY5OjI2QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTUdKMkljREVLYU90NzRHR0FZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiV2NyOFhGbklVbGM1d1dCaXplL3hYcHZjMFBtOVBST2MvRlozWHBlNmdRMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoicnlhcVhqSkpZMkZQeVlZWHpiUEhlWlVLSzlaUVo3L3pBSVlXekkyVGhMWFF6bFYzbUxUaUllOUZGSktJTmF4aFZOQlBQdnRIT3dOWVpEOFk5UGo3QkE9PSIsImRldmljZVNpZ25hdHVyZSI6IktCL2ltSUhvRVFhMFJWRzc0NDhlYm9jd0FrNnl4bDJ3NDRWbEk1VjNWY01ESElGMXBTMDhyemlXbkpyd1JsOCt2V1MvcXB2QWRzYnFlZXBiMFNvVWpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0OTEzMTgwNDU5MzoyNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWbksvRnhaeUZKWE9jRmdZczN2OFY2YjNORDV2VDBUblB4V2QxNlh1b0VOIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDE1MzkxMjMsImxhc3RQcm9wSGFzaCI6IjNnUFVKayJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
