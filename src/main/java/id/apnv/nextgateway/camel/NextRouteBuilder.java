package id.apnv.nextgateway.camel;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.rest.RestBindingMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import id.apnv.nextgateway.entity.endpoint.Endpoint;
import id.apnv.nextgateway.service.EndpointService;

@Component
public class NextRouteBuilder extends RouteBuilder {

    @Autowired
    private EndpointService endpointService;

    // @Autowired
    // private EndpointConfigurationTelegramRepository endpointConfigurationTelegramRepository;

    @Override
    public void configure() {

        restConfiguration().enableCORS(true).component("servlet")
                .bindingMode(RestBindingMode.json);

        rest("/rest")
                .get().to("direct:restGet")
                .post().to("direct:restPost")
                .put().to("direct:restPut")
                .patch().to("direct:restPatch")
                .delete().to("direct:restDelete");

        // endpointService.getAll().forEach(e -> {
        //     switch (e.getType()) {
        //         case FIREBASE:

        //             break;
        //         case HTTP:

        //             break;
        //         case SAP_ODATA:

        //             break;

        //         case TELEGRAM:
        //             configTelegram(e);
        //             break;
        //         default:
        //             break;
        //     }
        // });

        // from("direct:restGet")
        // .transform().constant("Hello World");

        // from("direct:restPost")
        // .transform().constant("Hello World");
    }

    private void configTelegram(Endpoint e) {
        // Optional<EndpointConfigurationTelegram> config = endpointConfigurationTelegramRepository
        //         .findById(e.getConfigId());
        // if (!config.isPresent()) {
        //     return;
        // }

        // String endpointUri = "telegram:bots?authorizationToken=" + config.get().getBotToken();
        // from("direct:restPost")
        //         .process(exchange -> {
        //             DefaultMessage message = new DefaultMessage(exchange);
        //             message.setHeader("CamelTelegramChatId", config.get().getChatId());
        //             message.setBody(exchange.getIn().getBody());
        //             exchange.setMessage(message);
        //         })
        //         .to(endpointUri);
    }
}
