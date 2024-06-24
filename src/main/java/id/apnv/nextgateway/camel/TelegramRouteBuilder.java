package id.apnv.nextgateway.camel;

import org.apache.camel.builder.RouteBuilder;

import id.apnv.nextgateway.entity.endpoint.Endpoint;
import id.apnv.nextgateway.entity.endpoint.EndpointConfigurationTelegram;
import id.apnv.nextgateway.entity.route.Route;

public class TelegramRouteBuilder extends RouteBuilder {

    private Endpoint endpoint;
    private Route route;

    public TelegramRouteBuilder(Endpoint endpoint, Route route) {
        this.endpoint = endpoint;
        this.route = route;
    }

    @Override
    public void configure() throws Exception {
        EndpointConfigurationTelegram configTelegram = endpoint.getConfigTelegram();

        String fromURI = route.getName();
        String endpointUri = "telegram:bots?authorizationToken=" + configTelegram.getBotToken();

        from(fromURI)
            .routeId(fromURI)
            .process(new TelegramProcessor(configTelegram))
            .to(endpointUri);
    }

}
