package id.apnv.nextgateway.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.apnv.nextgateway.entity.Endpoint;
import id.apnv.nextgateway.service.EndpointService;

@RestController
@RequestMapping("${apiPrefix}/endpoints")
public class EndpointController extends CrudController<Endpoint, String> {

    protected EndpointController(EndpointService endpointService) {
        super(endpointService);
    }

}
