package fs.four.eatery.user.controller;

import fs.four.eatery.user.service.LoginServiceImpl;
import fs.four.eatery.user.service.UserServiceImpl;
import fs.four.eatery.user.vo.UserVO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller("userController")
@RequestMapping("/user")
public class UserController {

    @Autowired
    private LoginServiceImpl loginService;

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/signup")
    public String signup(@ModelAttribute UserVO userVO, Model model) {
        try {
            // 회원가입 처리
            userService.registerUser(userVO);
            return "redirect:/signup-success"; // 성공 페이지로 리다이렉트
        } catch (Exception e) {
            // 예외 발생 시 처리
            e.printStackTrace(); // 예외 로그를 출력 (디버깅에 도움이 됨)
            model.addAttribute("errorMessage", "회원가입 중 오류가 발생했습니다. 다시 시도해주세요."); // 사용자 친화적인 메시지
            return "sign_up"; // 회원가입 페이지로 리턴
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserVO user) {
        try {
            UserVO loggedInUser = loginService.login(user.getMem_id(), user.getMem_pw());

            if (loggedInUser != null) {
                // 로그인 성공 시 JWT 토큰 발급 (예시로 헤더에 추가)
                String token = "Bearer exampleToken"; // 실제로 JWT 구현 필요
                return ResponseEntity.ok().header("Authorization", token).body(loggedInUser);
            } else {
                // 로그인 실패
                return ResponseEntity.status(401).body("아이디 또는 비밀번호가 잘못되었습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
        }
    }

    @GetMapping("/logout")
    @ResponseBody
    public String logout(HttpServletRequest request) {
        // JWT는 클라이언트에서 저장하므로, 로그아웃은 클라이언트가 토큰을 삭제하도록 안내합니다.
        return "Logout successful! Please delete your token.";
    }
}
