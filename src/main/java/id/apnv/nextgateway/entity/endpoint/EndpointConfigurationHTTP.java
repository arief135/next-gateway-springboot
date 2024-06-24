package id.apnv.nextgateway.entity.endpoint;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class EndpointConfigurationHTTP extends EndpointConfiguration {
    private String destination;
    private String authType;
    private String authBasicUser;
    private String authBasicPasswod;
}
