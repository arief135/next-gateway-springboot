package id.apnv.nextgateway.camel;

import org.apache.camel.Exchange;
import org.apache.camel.ExchangePattern;
import org.apache.camel.Processor;
import org.apache.camel.support.DefaultMessage;

import id.apnv.nextgateway.entity.endpoint.EndpointConfigurationTelegram;

public class TelegramProcessor implements Processor {

    private EndpointConfigurationTelegram configTelegram;

    public TelegramProcessor(EndpointConfigurationTelegram configTelegram) {
        this.configTelegram = configTelegram;
    }

    @Override
    public void process(Exchange exchange) throws Exception {
        DefaultMessage message = new DefaultMessage(exchange);
        message.setHeader("CamelTelegramChatId", configTelegram.getChatId());
        message.setBody(exchange.getIn().getBody());
        exchange.setMessage(message);
        exchange.setPattern(ExchangePattern.InOnly);
    }

}
