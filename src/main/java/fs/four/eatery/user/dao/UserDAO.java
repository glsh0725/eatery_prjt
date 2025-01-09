package fs.four.eatery.user.dao;

import fs.four.eatery.user.vo.UserVO;
import org.springframework.dao.DataAccessException;

public interface UserDAO {
    public UserVO loginById(UserVO userVO) throws DataAccessException;
}
