package fs.four.eatery.user.controller;

import fs.four.eatery.user.vo.UserVO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

public interface UserController {

    public ModelAndView addUser(@ModelAttribute("info")UserVO userVO,
                                HttpServletRequest request,
                                HttpServletResponse response) throws Exception;

    public ModelAndView login(@ModelAttribute("user") UserVO userVO,
                              RedirectAttributes redirectAttributes,
                              HttpServletRequest request,
                              HttpServletResponse response) throws Exception;

    public ModelAndView logout(HttpServletRequest request,
                               HttpServletResponse response) throws Exception;
}
