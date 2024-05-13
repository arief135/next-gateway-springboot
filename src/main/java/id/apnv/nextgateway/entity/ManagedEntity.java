package id.apnv.nextgateway.entity;

import java.sql.Timestamp;

import org.springframework.security.core.context.SecurityContextHolder;

import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class ManagedEntity {

    private Timestamp createAt;
    private String createdBy;
    private Timestamp changedAt;
    private String changedBy;

    public void setCreateDefaults() {
        createAt = changedAt = new Timestamp(System.currentTimeMillis());
        createdBy = changedBy = SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public void setChangeDefaults() {
        changedAt = new Timestamp(System.currentTimeMillis());
        changedBy = SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public Timestamp getCreateAt() {
        return createAt;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Timestamp getChangedAt() {
        return changedAt;
    }

    public String getChangedBy() {
        return changedBy;
    }

}
