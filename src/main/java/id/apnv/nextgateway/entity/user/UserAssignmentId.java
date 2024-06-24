package id.apnv.nextgateway.entity.user;

import java.io.Serializable;

public class UserAssignmentId implements Serializable {
    @SuppressWarnings("unused")
    private String user_;
    @SuppressWarnings("unused")
    private UserRoleEnum userRole;

    public UserAssignmentId() {
        super();
    }

    public UserAssignmentId(String user_, UserRoleEnum userRole) {
        this.user_ = user_;
        this.userRole = userRole;
    }
}
