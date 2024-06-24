package id.apnv.nextgateway.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import id.apnv.nextgateway.entity.endpoint.Endpoint;
import id.apnv.nextgateway.entity.endpoint.EndpointConfiguration;
import id.apnv.nextgateway.entity.endpoint.EndpointConfigurationFirebase;
import id.apnv.nextgateway.entity.endpoint.EndpointConfigurationHTTP;
import id.apnv.nextgateway.entity.endpoint.EndpointConfigurationSAPOData;
import id.apnv.nextgateway.entity.endpoint.EndpointConfigurationTelegram;
import id.apnv.nextgateway.service.EndpointService;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

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

        EndpointConfiguration configFirebase = entity.getConfigFirebase();
        EndpointConfiguration configHTTP = entity.getConfigHTTP();
        EndpointConfiguration configSAPOData = entity.getConfigSAPOData();
        EndpointConfiguration configTelegram = entity.getConfigTelegram();

        entity.setConfigFirebase(null);
        entity.setConfigHTTP(null);
        entity.setConfigSAPOData(null);
        entity.setConfigTelegram(null);

        switch (entity.getType()) {
            case FIREBASE:
                entity.setConfigFirebase((EndpointConfigurationFirebase) configFirebase);
                break;
            case HTTP:
                entity.setConfigHTTP((EndpointConfigurationHTTP) configHTTP);
                break;
            case SAP_ODATA:
                entity.setConfigSAPOData((EndpointConfigurationSAPOData) configSAPOData);
                break;
            case TELEGRAM:
                entity.setConfigTelegram((EndpointConfigurationTelegram) configTelegram);
                break;
            default:
                break;
        }

        return super.create(entity);
    }

    @PostMapping("/{id}/activate")
    public ResponseEntity<String> activate(@PathVariable String id) {
        if (service.activateEndpoint(id, true)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    @PostMapping("/{id}/deactivate")
    public ResponseEntity<String> deactivate(@PathVariable String id) {
        if (service.activateEndpoint(id, false)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

}
