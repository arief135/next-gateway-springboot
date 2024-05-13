package id.apnv.nextgateway.ws;

import org.springframework.ws.server.endpoint.annotation.Endpoint;

import id.apnv.nextgateway.entity.UserInfo;

@Endpoint
public class UserEndpoint {

    UserInfo getUserById(String username) {
        return new UserInfo();
    }

}
