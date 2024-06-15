package id.apnv.nextgateway.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import id.apnv.nextgateway.entity.endpoint.Endpoint;
import id.apnv.nextgateway.service.EndpointService;

@RestController
@RequestMapping("${apiPrefix}/endpoints")
public class EndpointController extends CrudController<Endpoint, String> {

    private EndpointService service;

    protected EndpointController(EndpointService service) {
        super(service);
        this.service = service;
    }

    @Override
    public Endpoint create(Endpoint entity) {

        if (service.existsById(entity.getName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Duplicate entry");
        }

        if (entity.getConfigFirebase() != null) {
            entity.getConfigFirebase().setEndpoint(entity);
        }

        if (entity.getConfigHTTP() != null) {
            entity.getConfigHTTP().setEndpoint(entity);
        }

        if (entity.getConfigSAPOData() != null) {
            entity.getConfigSAPOData().setEndpoint(entity);
        }

        if (entity.getConfigTelegram() != null) {
            entity.getConfigTelegram().setEndpoint(entity);
        }

        return super.create(entity);
    }

}
