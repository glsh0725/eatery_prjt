package fs.four.eatery.user.controller;

import fs.four.eatery.user.service.LoginServiceImpl;
import fs.four.eatery.user.service.UserServiceImpl;
import fs.four.eatery.user.vo.UserVO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            return ResponseEntity.ok("http://192.168.0.61:18080/login");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("회원가입 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserVO user) {
        try {
            UserVO loggedInUser = loginService.login(user.getMem_id(), user.getMem_pw());

            // JWT 토큰 생성
            String token = loginService.generateToken(loggedInUser);

            // 클라이언트로 토큰 반환
            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + token)
                    .body(loggedInUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body("아이디 또는 비밀번호가 잘못되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("서버 오류가 발생했습니다.");
        }
    }

    @Override
    @GetMapping("/logout")
    @ResponseBody
    public String logout(HttpServletRequest request) {
        // 클라이언트 토큰 삭제 안내
        return "Logout successful! Please delete your token.";
    }

    // 모든 멤버 정보를 가져오는 API
    @GetMapping("/users")
    public ResponseEntity<List<UserVO>> getAllUsers() {
        try {
            List<UserVO> users = userService.getAllMembers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}