package id.apnv.nextgateway.entity.user;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class UserRole {

    @Id
    @Enumerated(EnumType.STRING)
    private UserRoleEnum userRole;
}
