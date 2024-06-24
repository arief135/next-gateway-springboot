package id.apnv.nextgateway.entity.endpoint;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class EndpointConfiguration implements Serializable {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID configId;

    public UUID getConfigId() {
        return configId;
    }
}
