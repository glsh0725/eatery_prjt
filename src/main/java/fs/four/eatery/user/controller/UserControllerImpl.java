package fs.four.eatery.user.controller;

import fs.four.eatery.user.service.LoginServiceImpl;
import fs.four.eatery.user.vo.UserVO;
import fs.four.eatery.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller("userController")
@RequestMapping("/user")
public class UserControllerImpl {

    @Autowired
    private LoginServiceImpl loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserVO user) {
        UserVO loggedInUser = loginService.login(user.getMem_id(), user.getMem_pw());

        if (loggedInUser != null) {
            // 로그인 성공 시 JWT 토큰 발급 (예시로 헤더에 추가)
            String token = "Bearer exampleToken"; // 실제로 JWT 구현 필요
            return ResponseEntity.ok().header("Authorization", token).body(loggedInUser);
        } else {
            // 로그인 실패
            return ResponseEntity.status(401).body("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    }

    @GetMapping("/logout")
    @ResponseBody
    public String logout(HttpServletRequest request) {
        // JWT는 클라이언트에서 저장하므로, 로그아웃은 클라이언트가 토큰을 삭제하도록 안내합니다.
        return "Logout successful! Please delete your token.";
    }
}