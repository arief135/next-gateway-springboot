package id.apnv.nextgateway.camel;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.rest.RestBindingMode;
import org.springframework.stereotype.Component;

@Component
public class RestApi extends RouteBuilder {

    @Override
    public void configure() {

        // restConfiguration().enableCORS(true).component("servlet")
        //         .bindingMode(RestBindingMode.json);

        // rest("/say")
        //         .get("/hello").to("direct:hello")
        //         .get("/bye").consumes("application/json").to("direct:bye")
        //         .post("/bye").to("mock:update");

        // from("direct:hello")
        //         .transform().constant("Hello World");

        // from("direct:bye")
        //         .transform().constant("Bye World");

    }
}
