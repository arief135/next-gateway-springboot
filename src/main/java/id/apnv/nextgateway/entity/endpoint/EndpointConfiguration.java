package id.apnv.nextgateway.entity.endpoint;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToOne;

@MappedSuperclass
public class EndpointConfiguration implements Serializable {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID configId;

    @OneToOne
    private Endpoint endpoint;

    public UUID getConfigId() {
        return configId;
    }


    public Endpoint getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(Endpoint endpoint) {
        this.endpoint = endpoint;
    }
}
