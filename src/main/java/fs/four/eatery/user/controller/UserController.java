package fs.four.eatery.user.controller;

import fs.four.eatery.user.vo.UserVO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

public interface UserController {

    @PostMapping("/signup")
    ResponseEntity<String> signup(@ModelAttribute UserVO userVO);

    @PostMapping("/login")
    ResponseEntity<?> login(@RequestBody UserVO user);

    @GetMapping("/logout")
    @ResponseBody
    String logout(HttpServletRequest request);
}