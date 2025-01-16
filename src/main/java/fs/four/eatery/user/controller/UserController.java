package fs.four.eatery.user.controller;

import fs.four.eatery.user.service.UserService;
import fs.four.eatery.user.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserVO userVO;


}
