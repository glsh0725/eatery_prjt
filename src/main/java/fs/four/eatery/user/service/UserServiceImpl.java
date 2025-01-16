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
        // 나머지 처리
        userDAO.insertUser(userVO);

        try {
            Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
            userVO.setCreated_date(currentTimestamp);  // 현재 시간 설정
            userVO.setAgree_date(currentTimestamp);    // 현재 시간 설정

            userDAO.insertUser(userVO); // 데이터베이스에 사용자 추가
        } catch (Exception e) {
            throw new Exception("회원가입 중 오류가 발생했습니다.", e); // 예외 처리
        }
    }
}


//    @Autowired
//    private AdminDAO adminDAO;
