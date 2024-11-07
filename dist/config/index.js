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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RMQConnection = void 0;
require("dotenv/config");
const amqplib_1 = __importDefault(require("amqplib"));
const utils_1 = require("../utils");
const RMQConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const connectionString = `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASS}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}/${process.env.RMQ_VHOST}?heartbeat=60`;
    const connection = yield amqplib_1.default.connect(connectionString);
    const channel = yield connection.createChannel();
    if (!connection || !channel) {
        throw new Error("Failed to create channel");
    }
    utils_1.logger.info("RabbitMQ connected successfully");
    return channel;
});
exports.RMQConnection = RMQConnection;
