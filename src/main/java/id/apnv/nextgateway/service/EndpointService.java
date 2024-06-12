package id.apnv.nextgateway.service;

import org.springframework.stereotype.Service;

import id.apnv.nextgateway.entity.Endpoint;
import id.apnv.nextgateway.entity.EndpointRepository;

@Service
public class EndpointService extends CrudService<Endpoint, String> {

    public EndpointService(EndpointRepository endpointRepository) {
        super(endpointRepository);
    }

    @Override
    public Endpoint create(Endpoint entity) {
        entity.setCreateDefaults();
        return super.create(entity);
    }

}
