"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const utils_1 = require("./utils");
require("dotenv/config");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const channel = yield (0, config_1.RMQConnection)();
    const payload = {
        guid: "2fbc9805-c3ed-4894-af8b-ad80c2f9aa74",
        guid_device: "CAM-P027",
        value: "gajah5.jpg",
        timestamp: 1730712382,
        datetime: "04-11-2024 16:26:21",
    };
    channel.sendToQueue(process.env.RMQ_QUEU, Buffer.from(JSON.stringify(payload)), { persistent: true });
    utils_1.logger.info("Message sent successfully");
});
main().catch((err) => {
    utils_1.logger.error(err);
    process.exit(1);
});
