import { Channel } from "amqplib";
import { RMQConnection } from "./config";
import { logger } from "./utils";
import "dotenv/config";
import { IPayloadRMQ } from "./types/interface";

const main = async (): Promise<void> => {
  const channel: Channel = await RMQConnection();

  const payload: IPayloadRMQ = {
    guid: "2fbc9805-c3ed-4894-af8b-ad80c2f9aa74",
    guid_device: "CAM-P024",
    value: "gajah6.jpg",
    timestamp: 1730712382,
    datetime: "04-11-2024 16:26:21",
  };

  channel.sendToQueue(
    process.env.RMQ_QUEU as string,
    Buffer.from(JSON.stringify(payload)),
    { persistent: true }
  );

  logger.info("Message sent successfully");
};

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});
