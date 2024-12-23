package fs.four.eatery.main.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainControllerImpl {

    @GetMapping("/api/main")
    public String hello() {
        return "안녕하세요 메인페이지 입니다.";
    }
}