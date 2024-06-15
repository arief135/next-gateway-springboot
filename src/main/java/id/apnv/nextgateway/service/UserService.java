package id.apnv.nextgateway.service;

import org.springframework.stereotype.Service;

import id.apnv.nextgateway.entity.user.User;
import id.apnv.nextgateway.entity.user.UserRepository;

@Service
public class UserService extends CrudService<User, String> {

    public UserService(UserRepository userRepository) {
        super(userRepository);
    }

}
