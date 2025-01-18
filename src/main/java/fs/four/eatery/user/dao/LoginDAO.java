package fs.four.eatery.user.dao;

import fs.four.eatery.user.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LoginDAO {
    UserVO UserLogin(String mem_id); // mem_id로 사용자 조회
}