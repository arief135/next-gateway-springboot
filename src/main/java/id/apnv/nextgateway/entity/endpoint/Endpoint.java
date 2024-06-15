package id.apnv.nextgateway.entity.endpoint;

import java.util.UUID;

import id.apnv.nextgateway.entity.base.ManagedEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class Endpoint extends ManagedEntity {

    @Id @Size(min = 1)
    private String name;

    @Enumerated(EnumType.STRING)
    private EndpointType type;

    private boolean active;

    @OneToOne(optional = true, cascade = CascadeType.ALL)
    private EndpointConfigurationFirebase configFirebase;

    @OneToOne(optional = true, cascade = CascadeType.ALL)
    private EndpointConfigurationHTTP configHTTP;

    @OneToOne(optional = true, cascade = CascadeType.ALL)
    private EndpointConfigurationSAPOData configSAPOData;

    @OneToOne(optional = true, cascade = CascadeType.ALL)
    private EndpointConfigurationTelegram configTelegram;
}
