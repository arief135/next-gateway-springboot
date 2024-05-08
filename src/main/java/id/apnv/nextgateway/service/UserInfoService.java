package id.apnv.nextgateway.service;

import org.springframework.stereotype.Service;

import id.apnv.nextgateway.entity.UserInfo;
import id.apnv.nextgateway.entity.UserInfoRepository;

@Service
public class UserInfoService extends CrudService<UserInfo, String> {

    public UserInfoService(UserInfoRepository userInfoRepository) {
        super(userInfoRepository);
    }
}
