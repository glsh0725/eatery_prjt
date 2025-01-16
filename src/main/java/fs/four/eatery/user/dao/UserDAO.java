package fs.four.eatery.user.dao;

import fs.four.eatery.user.vo.UserVO;
import org.apache.catalina.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;

@Mapper
public interface UserDAO {

    public int insertUser(UserVO userVO) throws DataAccessException;


}
