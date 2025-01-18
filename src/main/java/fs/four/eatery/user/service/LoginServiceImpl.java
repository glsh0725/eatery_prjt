package fs.four.eatery.user.service;

import fs.four.eatery.user.dao.LoginDAO;
import fs.four.eatery.user.vo.UserVO;
import fs.four.eatery.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("loginService")
@Transactional(propagation = Propagation.REQUIRED)
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginDAO loginDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserVO login(String mem_id, String mem_pw) {
        UserVO user = loginDAO.UserLogin(mem_id); // 사용자 조회

        if (user == null) {
            throw new RuntimeException("존재하지 않는 사용자입니다.");
        }

        if (!passwordEncoder.matches(mem_pw, user.getMem_pw())) {
            throw new RuntimeException("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        return user;
    }

    public String generateToken(String mem_id, int role) {
        try {
            // JWT 토큰 생성
            String token = JwtUtil.generateToken(mem_id, String.valueOf(role));
            return token;
        } catch (Exception e) {
            throw new RuntimeException("토큰 생성 중 오류가 발생했습니다.", e);
        }
    }
}