package fs.four.eatery.user.service;

import fs.four.eatery.admin.dao.AdminDAO;
import fs.four.eatery.user.dao.UserDAO;
import fs.four.eatery.user.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Controller
@Service("userService")
@Transactional(propagation = Propagation.REQUIRED)
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;

//    @Autowired
//    private AdminDAO adminDAO;

    @Override
    public int addUser(UserVO user) throws Exception{
        return userDAO.insertUser(user);
    }
}
