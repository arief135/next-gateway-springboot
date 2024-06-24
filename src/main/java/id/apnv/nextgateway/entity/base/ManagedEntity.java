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
        createdAt = changedAt = new Timestamp(System.currentTimeMillis());
        createdBy = changedBy = SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public void setChangeDefaults() {
        changedAt = new Timestamp(System.currentTimeMillis());
        changedBy = SecurityContextHolder.getContext().getAuthentication().getName();
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

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public void setChangedAt(Timestamp changedAt) {
        this.changedAt = changedAt;
    }

    public void setChangedBy(String changedBy) {
        this.changedBy = changedBy;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

}
