package fs.four.eatery.user.dao;

import fs.four.eatery.user.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LoginDAO {

//    public UserVO UserLogin(UserVO userVO) throws Exception;
    UserVO UserLogin(@Param("mem_id") String mem_id, @Param("mem_pw") String mem_pw);
}

