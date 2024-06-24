package id.apnv.nextgateway.service;

import java.util.HashSet;
import java.util.Set;

import org.apache.camel.CamelContext;
import org.apache.camel.spring.SpringCamelContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import id.apnv.nextgateway.camel.TelegramRouteBuilder;
import id.apnv.nextgateway.entity.endpoint.Endpoint;
import id.apnv.nextgateway.entity.endpoint.EndpointType;
import id.apnv.nextgateway.entity.route.Route;

@Service
public class RouteService {

    @Autowired
    private CamelContext camelContext;

    public Set<Route> createRoutes(Endpoint endpoint) {
        Set<Route> routes = new HashSet<>();

        if (endpoint.getType() == EndpointType.TELEGRAM) {
            Route route = new Route();
            route.setName("rest:post:" + endpoint.getName());
            routes.add(route);
        }

        return routes;
    }

    public void activateRoute(Endpoint endpoint, Route route) throws Exception {
        org.apache.camel.Route camelRoute = camelContext.getRoute(route.getName());

        if (camelRoute == null) {
            if (endpoint.getType() == EndpointType.TELEGRAM) {
                camelContext.addRoutes(new TelegramRouteBuilder(endpoint, route));
            }
        } else {
            if (camelContext instanceof SpringCamelContext) {
                SpringCamelContext springCamelContext = (SpringCamelContext) camelContext;
                springCamelContext.startRoute(camelRoute.getId());
            }
        }
    }

    public void deactivateRoute(Endpoint endpoint, Route route) throws Exception {
        org.apache.camel.Route camelRoute = camelContext.getRoute(route.getName());

        if (camelRoute == null) {
            return;
        }

        if (camelContext instanceof SpringCamelContext) {
            SpringCamelContext springCamelContext = (SpringCamelContext) camelContext;
            springCamelContext.stopRoute(camelRoute.getId());
        }
    }
}
