package fs.four.eatery.user.service;

import fs.four.eatery.user.dao.UserDAO;
import fs.four.eatery.user.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserDAO userDAO;

    public UserVO login(UserVO userVO) throws Exception{
        return userDAO.loginById(userVO);
    }
}