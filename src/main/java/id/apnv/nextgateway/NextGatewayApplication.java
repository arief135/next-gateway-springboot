package id.apnv.nextgateway;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import id.apnv.nextgateway.entity.UserInfo;
import id.apnv.nextgateway.entity.UserInfoRepository;
import id.apnv.nextgateway.service.UserInfoService;

@SpringBootApplication
public class NextGatewayApplication {

    @Autowired
    private UserInfoRepository userInfoRepository;

    public static void main(String[] args) {
        SpringApplication.run(NextGatewayApplication.class, args);
    }

    @Bean
    public ApplicationRunner applicationRunner() {
        return (args) -> {
            // create default user if not exists
            UserInfo userInfo = new UserInfo();
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            userInfo.setActive(true);
            userInfo.setPassword(bCryptPasswordEncoder.encode("admin"));
            userInfo.setUsername("admin");
            userInfo.setCreateAt(new Timestamp(System.currentTimeMillis()));
            userInfo.setCreatedBy("SYSTEM");

            if (!userInfoRepository.existsById(userInfo.getUsername())) {
                userInfoRepository.save(userInfo);
            }
        };
    }

}
