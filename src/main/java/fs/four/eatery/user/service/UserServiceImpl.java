package fs.four.eatery.user.service;

import java.sql.Timestamp;
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
    private UserDAO userDAO; // UserDAO 주입

    @Override
    public void registerUser(UserVO userVO) throws Exception {
        if (userVO.getMem_id() == null || userVO.getMem_id().isEmpty()) {
            throw new Exception("아이디가 없습니다.");
        }

        try {
            // 중복 체크
            if (userDAO.isIdExist(userVO.getMem_id())) {
                throw new Exception("중복된 아이디입니다.");
            }

            if (userDAO.isEmailExist(userVO.getEmail())) {
                throw new Exception("중복된 이메일입니다.");
            }

            if (userDAO.isNicknameExist(userVO.getMem_nickname())) {
                throw new Exception("중복된 닉네임입니다.");
            }

            // 현재 시간 설정
            Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
            userVO.setCreated_date(currentTimestamp);
            userVO.setAgree_date(currentTimestamp);

            // 회원 추가
            userDAO.insertUser(userVO);
        } catch (Exception e) {
            throw new Exception("회원가입 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}