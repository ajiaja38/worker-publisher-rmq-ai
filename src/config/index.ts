import "dotenv/config";
import amqp from "amqplib";
import { logger } from "../utils";

export const RMQConnection = async (): Promise<amqp.Channel> => {
  const connectionString: string = `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASS}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}/${process.env.RMQ_VHOST}?heartbeat=60`;

  const connection: amqp.Connection = await amqp.connect(connectionString);
  const channel: amqp.Channel = await connection.createChannel();

  if (!connection || !channel) {
    throw new Error("Failed to create channel");
  }

  logger.info("RabbitMQ connected successfully");

  return channel;
};
