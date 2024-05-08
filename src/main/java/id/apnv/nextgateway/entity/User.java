package id.apnv.nextgateway.entity;

import org.springframework.data.repository.CrudRepository;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User implements IManagedEntity {

    @Id
    private String username;
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}

interface UserRepository extends CrudRepository<User, String> {
}