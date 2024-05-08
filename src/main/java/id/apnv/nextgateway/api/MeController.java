package id.apnv.nextgateway.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/me")
public class MeController {

    @GetMapping
    public String getMe() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

}
