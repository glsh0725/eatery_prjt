package fs.four.eatery.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping(value = {
            "/", "/login", "/about", "/find_store/**",
            "/ranking", "/pick_crew", "/sign_up",
            "/userinfo", "/find_userinfo", "/myPage",
            "/userprofile", "/admin"
    })
    public String forward() {
        // 모든 경로를 React의 index.html로 포워딩
        return "forward:/index.html";
    }
}