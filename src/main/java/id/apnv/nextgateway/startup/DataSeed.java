package id.apnv.nextgateway.startup;

import java.sql.Timestamp;
import java.util.Arrays;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import id.apnv.nextgateway.entity.user.User;
import id.apnv.nextgateway.entity.user.UserAssignment;
import id.apnv.nextgateway.entity.user.UserAssignmentRepository;
import id.apnv.nextgateway.entity.user.UserRepository;
import id.apnv.nextgateway.entity.user.UserRole;
import id.apnv.nextgateway.entity.user.UserRoleEnum;
import id.apnv.nextgateway.entity.user.UserRoleRepository;

public class DataSeed implements Runner {

    private UserRepository userRepository;
    private UserRoleRepository userRoleRepository;
    private UserAssignmentRepository userAssignmentRepository;

    @Override
    public void run() {
        seedDefaultRoles();
        seedDefaultUsers();
    }

    public DataSeed(UserRepository userRepository, UserRoleRepository userRoleRepository,
            UserAssignmentRepository userAssignmentRepository) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.userAssignmentRepository = userAssignmentRepository;
    }

    private void seedDefaultUsers() {
        String[] users = new String[] { "admin", "developer", "service" };

        Arrays.stream(users).forEach(u -> {
            // create default user if not exists
            User user = new User();
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

            user.setActive(true);
            user.setPassword(bCryptPasswordEncoder.encode(u));
            user.setUsername(u);
            user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            user.setCreatedBy("SYSTEM");

            UserAssignment userAssignment = new UserAssignment();

            switch (u) {
                case "admin":
                    userAssignment.setUser_(user.getUsername());
                    userAssignment.setUserRole(UserRoleEnum.ADMINISTRATOR);
                    break;
                case "developer":
                    userAssignment.setUser_(user.getUsername());
                    userAssignment.setUserRole(UserRoleEnum.DEVELOPER);
                    break;
                case "service":
                    userAssignment.setUser_(user.getUsername());
                    userAssignment.setUserRole(UserRoleEnum.SERVICE);
                    break;
                default:
                    break;
            }

            if (!userRepository.existsById(user.getUsername())) {
                userRepository.save(user);
                userAssignmentRepository.save(userAssignment);
            }
        });
    }

    private void seedDefaultRoles() {
        UserRoleEnum[] enums = new UserRoleEnum[] { UserRoleEnum.ADMINISTRATOR, UserRoleEnum.DEVELOPER,
                UserRoleEnum.SERVICE };

        Arrays.stream(enums).forEach(e -> {
            UserRole role = new UserRole();
            role.setUserRole(e);
            userRoleRepository.save(role);
        });
    }

}