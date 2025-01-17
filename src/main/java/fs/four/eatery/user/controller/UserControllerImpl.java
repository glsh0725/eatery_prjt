package fs.four.eatery.user.controller;

import fs.four.eatery.user.service.LoginServiceImpl;
import fs.four.eatery.user.service.UserServiceImpl;
import fs.four.eatery.user.vo.UserVO;
import fs.four.eatery.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller("userController")
@RequestMapping("/api")
public class UserControllerImpl implements UserController {

    @Autowired
    private LoginServiceImpl loginService;

    @Autowired
    private UserServiceImpl userService;

    @Override
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@ModelAttribute UserVO userVO) {
        try {
            userService.registerUser(userVO);
            // 회원가입 성공 시 /login으로 이동하도록 URL 반환
            return ResponseEntity.ok("http://localhost:18080/login");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("회원가입 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserVO user) {
        try {
            UserVO loggedInUser = loginService.login(user.getMem_id(), user.getMem_pw());

            if (loggedInUser != null) {
                // 로그인 성공 시 JWT 토큰 생성
                String token = JwtUtil.generateToken(loggedInUser.getMem_id(), loggedInUser.getRole());
                return ResponseEntity.ok()
                        .header("Authorization", "Bearer " + token)
                        .body(loggedInUser);
            } else {
                return ResponseEntity.status(401).body("아이디 또는 비밀번호가 잘못되었습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
        }
    }

    @Override
    @GetMapping("/logout")
    @ResponseBody
    public String logout(HttpServletRequest request) {
        // 클라이언트 토큰 삭제 안내
        return "Logout successful! Please delete your token.";
    }
}