package fs.four.eatery.user.service;

import fs.four.eatery.user.vo.UserVO;

public interface UserService {
    public UserVO login(UserVO userVO) throws Exception;
}
