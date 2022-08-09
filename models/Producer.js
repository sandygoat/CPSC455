const amqp = require("amqplib");
const config = require("../config/config");

class Producer {
    channel;

    async createChannel(){
        const connection = await amqp.connect(config.rabbitMQ.url);
        this.channel = await connection.createChannel();
    }

    async publishMessage(message){
        if(!this.channel){
            await this.createChannel();
        }

        const exchangeName = config.rabbitMQ.exchangeName;
        await this.channel.assertExchange(exchangeName, "fanout");

        await this.channel.publish(
            exchangeName,
            '',
            Buffer.from(message)
        )
    }
}

module.exports = Producer;