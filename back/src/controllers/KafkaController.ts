import {Request, Response} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';
import {Consumer, Kafka, Producer} from 'kafkajs';
import {ParsedQs} from 'qs';
import Controller from './Controller';

const kafka = new Kafka({
    clientId: 'kafka-gifter',
    brokers: ['localhost:9092'],
});

class NotificationService {
    listeners: Set<(message: string) => void>;
    producer: Producer;
    consumer: Consumer;

    public add(listener: (message: string) => void) {
        this.listeners.add(listener);
    }

    public remove(listener: (message: string) => void) {
        this.listeners.delete(listener);
    }

    public async sendNotif(message: string) {
        this.producer.send({
            topic: "notifications",
            messages: [
                { value: message }
            ]
        })
    }

    private async notifyAll(message: string) {
        let msg = `data: ${message}\n\n`;
        for (let listener of this.listeners) {
            try {
                console.log(listener, msg);
                listener(msg);
            } catch (e) {
                console.log(e);
            }
        }
    }


    constructor() {
        this.listeners = new Set();
        try {
            console.log("connecting to kafka...");
            this.producer = kafka.producer();
            this.producer.connect();

            this.consumer = kafka.consumer({ groupId: "gifter-node" });
            this.consumer.connect();
            this.consumer.subscribe({ topic: "notifications", fromBeginning: false });
            this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    if (message.value == null) {
                        console.log("received empty message from kafka");
                        return;
                    }
                    this.notifyAll(message.value.toString());
                },
            })
        } catch (e) {
            console.log("error while connecting to kafka");
        }
    }
}

export const Notifications = new NotificationService();

class KafkaController extends Controller {

    async get(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            res.set({
                'Cache-Control': 'no-cache',
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive'
            });

            let callback = (m: string) => {
                res.write(m);
            }
            Notifications.add(callback);
            res.write("data: asdf\n\n");
            req.on('close', () => {
                Notifications.remove(callback);
                console.log(`ending`)
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({ status: 'error', message: 'Internal server error!' });
        }
    }

}