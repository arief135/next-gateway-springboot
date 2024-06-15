package id.apnv.nextgateway.entity.endpoint;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter
public class EndpointConfigurationTelegram extends EndpointConfiguration {
    private String botToken;
    private String botId;
    private String chatId;
}
