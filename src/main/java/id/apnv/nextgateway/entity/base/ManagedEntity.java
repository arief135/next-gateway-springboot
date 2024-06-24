package id.apnv.nextgateway.entity.base;

import java.sql.Timestamp;

import org.springframework.security.core.context.SecurityContextHolder;

import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class ManagedEntity {

    private Timestamp createdAt;
    private String createdBy;
    private Timestamp changedAt;
    private String changedBy;

    public void setCreateDefaults() {
        setCreateDefaults(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    public void setCreateDefaults(String principal) {
        createdAt = new Timestamp(System.currentTimeMillis());
        createdBy = principal;
    }

    public void setChangeDefaults() {
        setChangeDefaults(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    public void setChangeDefaults(String principal) {
        changedAt = new Timestamp(System.currentTimeMillis());
        changedBy = principal;
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

    public Timestamp getCreatedAt() {
        return createdAt;
    }

}
