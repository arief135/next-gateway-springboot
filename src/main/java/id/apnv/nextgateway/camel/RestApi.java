package id.apnv.nextgateway.camel;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.rest.RestBindingMode;
import org.springframework.stereotype.Component;

@Component
public class RestApi extends RouteBuilder {

    @Override
    public void configure() {

        restConfiguration().enableCORS(true).component("servlet")
                .bindingMode(RestBindingMode.json);

        rest("/rest")
                .get().to("direct:restGet")
                .post().to("direct:restPost");

        from("direct:restGet")
                .transform().constant("Hello World");

        from("direct:restPost")
                .transform().constant("Hello World");
    }
}
