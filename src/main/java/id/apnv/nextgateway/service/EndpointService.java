package id.apnv.nextgateway.service;

import org.apache.camel.CamelContext;
import org.apache.camel.Route;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.spring.SpringCamelContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import id.apnv.nextgateway.camel.NextRouteBuilder;
import id.apnv.nextgateway.entity.endpoint.Endpoint;
import id.apnv.nextgateway.entity.endpoint.EndpointRepository;
import id.apnv.nextgateway.entity.endpoint.EndpointType;

@Service
public class EndpointService extends CrudService<Endpoint, String> {

    @Autowired
    private CamelContext camelContext;

    public EndpointService(EndpointRepository endpointRepository) {
        super(endpointRepository);
    }

    @Override
    public Endpoint partialUpdate(String id, Endpoint oldEntity, Endpoint newEntity) {
        switch (oldEntity.getType()) {
            case HTTP:
                oldEntity.getConfigHTTP().setDestination(newEntity.getConfigHTTP().getDestination());
                oldEntity.getConfigHTTP().setAuthBasicPasswod(newEntity.getConfigHTTP().getAuthBasicPasswod());
                oldEntity.getConfigHTTP().setAuthBasicUser(newEntity.getConfigHTTP().getAuthBasicUser());
                oldEntity.getConfigHTTP().setAuthType(newEntity.getConfigHTTP().getAuthType());
                break;

            case TELEGRAM:
                oldEntity.getConfigTelegram().setBotId(newEntity.getConfigTelegram().getBotId());
                oldEntity.getConfigTelegram().setBotToken(newEntity.getConfigTelegram().getBotToken());
                oldEntity.getConfigTelegram().setChatId(newEntity.getConfigTelegram().getChatId());
                break;
            default:
                break;
        }
        return super.partialUpdate(id, oldEntity, newEntity);
    }

    public boolean activateEndpoint(String id) {
        var opt = this.getById(id);

        if (!opt.isPresent()) {
            return false;
        }

        Endpoint endpoint = opt.get();

        Route camelRoute = camelContext.getRoute(endpoint.getName());

        try {

            if (camelRoute == null) {
                if (endpoint.getType() == EndpointType.TELEGRAM) {
                    camelContext.addRoutes(new RouteBuilder() {
                        @Override
                        public void configure() throws Exception {
                            NextRouteBuilder.configTelegram(this, endpoint);
                        }
                    });
                }
                if (endpoint.getType() == EndpointType.HTTP) {
                    camelContext.addRoutes(new RouteBuilder() {
                        @Override
                        public void configure() throws Exception {
                            NextRouteBuilder.configHttp(this, endpoint);
                        }
                    });
                }
            } else {
                if (camelContext instanceof SpringCamelContext) {
                    SpringCamelContext springCamelContext = (SpringCamelContext) camelContext;
                    springCamelContext.startRoute(camelRoute.getId());
                }
            }

        } catch (Exception e) {
            return false;
        }

        endpoint.setActive(true);

        return true;
    }

    public boolean deactivateEndpoint(String id) {
        var opt = this.getById(id);

        if (!opt.isPresent()) {
            return false;
        }

        Endpoint endpoint = opt.get();

        Route camelRoute = camelContext.getRoute(endpoint.getName());

        if (camelContext instanceof SpringCamelContext) {
            SpringCamelContext springCamelContext = (SpringCamelContext) camelContext;

            try {
                springCamelContext.stopRoute(camelRoute.getId());
            } catch (Exception e) {
                return false;
            }
        }

        endpoint.setActive(false);

        return true;
    }
}
