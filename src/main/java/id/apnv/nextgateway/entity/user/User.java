package id.apnv.nextgateway.entity.user;

import java.sql.Timestamp;
import java.util.Set;

import id.apnv.nextgateway.entity.base.ManagedEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "Users")
@Getter
@Setter
public class User extends ManagedEntity {

    @Id
    @Size(min = 3)
    private String username;
    private String password;
    private Timestamp lastLoggedIn;
    private boolean active;

    @OneToMany(mappedBy = "user_")
    private Set<UserAssignment> userAssignment;
}
