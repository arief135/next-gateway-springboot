package id.apnv.nextgateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import id.apnv.nextgateway.entity.user.UserAssignmentRepository;
import id.apnv.nextgateway.entity.user.UserRepository;
import id.apnv.nextgateway.entity.user.UserRoleRepository;
import id.apnv.nextgateway.startup.DataSeed;
import id.apnv.nextgateway.startup.Runner;

@SpringBootApplication
public class NextGatewayApplication {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private UserAssignmentRepository userAssignmentRepository;

    public static void main(String[] args) {
        SpringApplication.run(NextGatewayApplication.class, args);
    }

    @Bean
    public ApplicationRunner applicationRunner() {
        return (args) -> {
            Runner dataSeeder = new DataSeed(userRepository, userRoleRepository, userAssignmentRepository);
            dataSeeder.run();
        };
    }

}
