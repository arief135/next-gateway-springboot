package id.apnv.nextgateway.camel;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.rest.RestBindingMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import id.apnv.nextgateway.entity.endpoint.Endpoint;
import id.apnv.nextgateway.entity.endpoint.EndpointConfigurationTelegram;
import id.apnv.nextgateway.service.EndpointService;

@Component
@Configuration
public class NextRouteBuilder extends RouteBuilder {

    @Autowired
    private EndpointService endpointService;

    @Override
    public void configure() {

        restConfiguration().enableCORS(true).component("servlet")
                .bindingMode(RestBindingMode.json);

        endpointService.getAll().forEach(e -> {
            if (!e.isActive()) {
                return;
            }
            switch (e.getType()) {
                case TELEGRAM:
                    configTelegram(e);
                    break;
                default:
                    break;
            }
        });
    }

    private void configTelegram(Endpoint e) {
        EndpointConfigurationTelegram configTelegram = e.getConfigTelegram();

        String fromURI = "rest:post:" + e.getName();
        String endpointUri = "telegram:bots?authorizationToken=" + configTelegram.getBotToken();

        from(fromURI)
                .process(new TelegramProcessor(configTelegram))
                .to(endpointUri);
    }

}
