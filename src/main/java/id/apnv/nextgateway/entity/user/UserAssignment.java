package id.apnv.nextgateway.entity.user;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.Data;

@Entity
@IdClass(UserAssignmentId.class)
@Data
public class UserAssignment {

    @Id
    private String user_;

    @Id @Enumerated(EnumType.STRING)
    private UserRoleEnum userRole;
    
}