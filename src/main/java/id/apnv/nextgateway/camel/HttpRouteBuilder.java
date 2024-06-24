package id.apnv.nextgateway.camel;

import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.http.common.HttpMethods;

import id.apnv.nextgateway.entity.endpoint.Endpoint;
import id.apnv.nextgateway.entity.endpoint.EndpointConfigurationHTTP;
import id.apnv.nextgateway.entity.route.Route;

public class HttpRouteBuilder extends RouteBuilder {

    private Endpoint endpoint;
    private Route route;

    public HttpRouteBuilder(Endpoint endpoint, Route route) {
        this.endpoint = endpoint;
        this.route = route;
    }

    @Override
    public void configure() throws Exception {
        EndpointConfigurationHTTP configHttp = endpoint.getConfigHTTP();

        String fromURI = route.getName();
        String[] splitName = fromURI.split(":");

        String protocol = splitName[0];
        String method = splitName[1];
        String name = splitName[2];

        switch (method) {
            case "get":
                from(fromURI)
                        .setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.GET))
                        .to(configHttp.getDestination());
                break;
            case "post":
                from(fromURI)
                        .setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.POST))
                        .to(configHttp.getDestination());
                break;
            case "put":
                from(fromURI)
                        .setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.PUT))
                        .to(configHttp.getDestination());
                break;
            case "patch":
                from(fromURI)
                        .setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.PATCH))
                        .to(configHttp.getDestination());
                break;
            case "delete":
                from(fromURI)
                        .setHeader(Exchange.HTTP_METHOD, constant(HttpMethods.DELETE))
                        .to(configHttp.getDestination());
                break;
            default:
                break;
        }
    }

}
