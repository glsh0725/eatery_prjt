package fs.four.eatery.user.service;

import fs.four.eatery.user.vo.UserVO;

public interface LoginService {
    public UserVO login(String mem_id, String mem_pw);
}