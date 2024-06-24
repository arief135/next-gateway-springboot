package id.apnv.nextgateway.service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import id.apnv.nextgateway.entity.endpoint.Endpoint;
import id.apnv.nextgateway.entity.endpoint.EndpointRepository;
import id.apnv.nextgateway.entity.route.Route;

@Service
public class EndpointService extends CrudService<Endpoint, String> {

    @Autowired
    private RouteService routeService;

    public EndpointService(EndpointRepository endpointRepository) {
        super(endpointRepository);
    }

    @Override
    public Endpoint create(Endpoint entity) {

        Set<Route> routes = routeService.createRoutes(entity);
        entity.setRoutes(routes);

        return super.create(entity);
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

    public boolean activateEndpoint(String id, boolean status) {
        var opt = this.getById(id);
        if (!opt.isPresent()) {
            return false;
        }

        if (opt.get().isActive() && status) {
            return false;
        }

        if (!opt.get().isActive() && !status) {
            return false;
        }

        var endpoint = opt.get();
        endpoint.setActive(status);

        boolean camelStatus = false;

        if (status) {
            camelStatus = endpoint
                    .getRoutes()
                    .stream()
                    .map(r -> {
                        try {
                            routeService.activateRoute(endpoint, r);
                            return true;
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        return false;
                    })
                    .allMatch(p -> p);

        } else {
            camelStatus = endpoint
                    .getRoutes()
                    .stream()
                    .map(r -> {
                        try {
                            routeService.deactivateRoute(endpoint, r);
                            return true;
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        return false;
                    })
                    .allMatch(p -> p);
        }

        if (camelStatus) {
            this.update(id, endpoint);
        }

        return true;
    }

}
