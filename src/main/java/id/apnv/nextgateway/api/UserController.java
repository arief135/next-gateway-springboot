package id.apnv.nextgateway.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.apnv.nextgateway.entity.user.User;
import id.apnv.nextgateway.service.UserService;

@RestController
@RequestMapping("${apiPrefix}/users")
public class UserController extends CrudController<User, String> {

    protected UserController(UserService userService) {
        super(userService);
    }

}
