package id.apnv.nextgateway.camel;

import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.builder.ValueBuilder;
import org.apache.camel.http.common.HttpMethods;
import org.apache.camel.model.rest.RestBindingMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import id.apnv.nextgateway.entity.endpoint.Endpoint;
import id.apnv.nextgateway.entity.endpoint.EndpointConfigurationHTTP;
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
                    NextRouteBuilder.configTelegram(this, e);
                    break;
                case HTTP:
                    NextRouteBuilder.configHttp(this, e);
                default:
                    break;
            }

        });
    }

    public static String getConsumerURI(Endpoint e) {
        return "rest:post:" + e.getName();
    }

    public static void configTelegram(RouteBuilder rb, Endpoint endpoint) {
        EndpointConfigurationTelegram configTelegram = endpoint.getConfigTelegram();

        String fromURI = getConsumerURI(endpoint);
        String endpointUri = "telegram:bots?authorizationToken=" + configTelegram.getBotToken();

        rb.from(fromURI)
                .routeId(endpoint.getName())
                .process(new TelegramProcessor(configTelegram))
                .to(endpointUri);
    }

    public static void configHttp(RouteBuilder rb, Endpoint endpoint) {
        EndpointConfigurationHTTP configHttp = endpoint.getConfigHTTP();

        String fromURI = getConsumerURI(endpoint);
        String[] splitName = fromURI.split(":");
        String method = splitName[1];

        ValueBuilder methodConstant = null;

        switch (method) {
            case "get":
                methodConstant = rb.constant(HttpMethods.GET);
                break;
            case "post":
                methodConstant = rb.constant(HttpMethods.POST);
                break;
            case "put":
                methodConstant = rb.constant(HttpMethods.PUT);
                break;
            case "patch":
                methodConstant = rb.constant(HttpMethods.PATCH);
                break;
            case "delete":
                methodConstant = rb.constant(HttpMethods.DELETE);
                break;
            default:
                break;
        }

        rb.from(fromURI)
                .routeId(endpoint.getName())
                .setHeader(Exchange.HTTP_METHOD, methodConstant)
                .to(configHttp.getDestination() + "?bridgeEndpoint=true");

    }
}
