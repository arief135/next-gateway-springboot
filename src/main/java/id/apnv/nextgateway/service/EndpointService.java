package id.apnv.nextgateway.service;

import org.springframework.stereotype.Service;

import id.apnv.nextgateway.entity.endpoint.Endpoint;
import id.apnv.nextgateway.entity.endpoint.EndpointRepository;

@Service
public class EndpointService extends CrudService<Endpoint, String> {

    public EndpointService(EndpointRepository endpointRepository) {
        super(endpointRepository);
    }
}
