import pika
import json
from app.core.config import settings

class MessagingService:
    def __init__(self):
        try:
            parameters = pika.URLParameters(settings.RABBITMQ_URL)
            self.connection = pika.BlockingConnection(parameters)
            self.channel = self.connection.channel()
            self.channel.exchange_declare(exchange='disaster_events', exchange_type='topic')
        except Exception as e:
            print(f"Failed to connect to RabbitMQ: {e}")
            self.connection = None
            self.channel = None

    def publish_event(self, event_type: str, payload: dict):
        if not self.channel:
            return
            
        message = {
            "event_type": event_type,
            **payload
        }
        
        self.channel.basic_publish(
            exchange='disaster_events',
            routing_key=event_type,
            body=json.dumps(message)
        )

messenger = MessagingService()
