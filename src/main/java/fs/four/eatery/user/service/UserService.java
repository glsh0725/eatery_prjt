package fs.four.eatery.user.service;

import fs.four.eatery.user.vo.UserVO;

import java.util.List;

public interface UserService {

    public void registerUser(UserVO userVO) throws Exception;

    List<UserVO> getAllMembers();
}
