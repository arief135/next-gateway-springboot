package id.apnv.nextgateway.entity;

import java.sql.Timestamp;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class ManagedEntity {

    private Timestamp createAt = null;
    private String createdBy = null;
    private Timestamp changedAt = null;
    private String changedBy = null;

    public Timestamp getCreateAt() {
        return createAt;
    }
    public void setCreateAt(Timestamp createAt) {
        this.createAt = createAt;
    }
    public String getCreatedBy() {
        return createdBy;
    }
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    public Timestamp getChangedAt() {
        return changedAt;
    }
    public void setChangedAt(Timestamp changedAt) {
        this.changedAt = changedAt;
    }
    public String getChangedBy() {
        return changedBy;
    }
    public void setChangedBy(String changedBy) {
        this.changedBy = changedBy;
    }  
}
