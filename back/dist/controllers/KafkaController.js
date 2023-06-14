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
exports.Notifications = void 0;
const kafkajs_1 = require("kafkajs");
const Controller_1 = __importDefault(require("./Controller"));
const kafka = new kafkajs_1.Kafka({
    clientId: 'kafka-gifter',
    brokers: ['localhost:9092'],
});
class NotificationService {
    add(listener) {
        this.listeners.add(listener);
    }
    remove(listener) {
        this.listeners.delete(listener);
    }
    sendNotif(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.producer.send({
                topic: "notifications",
                messages: [
                    { value: message }
                ]
            });
        });
    }
    notifyAll(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = `data: ${message}\n\n`;
            for (let listener of this.listeners) {
                try {
                    console.log(listener, msg);
                    listener(msg);
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
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
                eachMessage: ({ topic, partition, message }) => __awaiter(this, void 0, void 0, function* () {
                    if (message.value == null) {
                        console.log("received empty message from kafka");
                        return;
                    }
                    this.notifyAll(message.value.toString());
                }),
            });
        }
        catch (e) {
            console.log("error while connecting to kafka");
        }
    }
}
exports.Notifications = new NotificationService();
class KafkaController extends Controller_1.default {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.set({
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'text/event-stream',
                    'Connection': 'keep-alive'
                });
                let callback = (m) => {
                    res.write(m);
                };
                exports.Notifications.add(callback);
                res.write("data: asdf\n\n");
                req.on('close', () => {
                    exports.Notifications.remove(callback);
                    console.log(`ending`);
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ status: 'error', message: 'Internal server error!' });
            }
        });
    }
}
