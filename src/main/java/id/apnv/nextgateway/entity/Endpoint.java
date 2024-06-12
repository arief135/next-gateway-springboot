package id.apnv.nextgateway.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Endpoint extends ManagedEntity {

    @Id
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
