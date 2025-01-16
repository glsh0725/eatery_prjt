package fs.four.eatery.user.service;

import fs.four.eatery.user.dao.LoginDAO;
import fs.four.eatery.user.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("loginService")
@Transactional(propagation = Propagation.REQUIRED)
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginDAO loginDAO;

    public UserVO login(String mem_id, String mem_pw) {
        return loginDAO.UserLogin(mem_id, mem_pw);
    }

}
