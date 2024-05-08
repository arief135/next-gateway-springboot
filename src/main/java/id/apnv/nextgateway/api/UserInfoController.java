package id.apnv.nextgateway.api;

import org.springframework.web.bind.annotation.RestController;

import id.apnv.nextgateway.entity.UserInfo;
import id.apnv.nextgateway.service.UserInfoService;

@RestController("users")
public class UserInfoController extends CrudController<UserInfo, String> {

    protected UserInfoController(UserInfoService userInfoService) {
        super(userInfoService);
    }

}
