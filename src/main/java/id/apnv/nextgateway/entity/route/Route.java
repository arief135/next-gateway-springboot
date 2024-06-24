package id.apnv.nextgateway.entity.route;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity @Data
public class Route {

    @Id
    private String name;

    private String camelName;
}
