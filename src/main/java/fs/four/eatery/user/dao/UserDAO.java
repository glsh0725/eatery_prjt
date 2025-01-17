package fs.four.eatery.user.dao;

import fs.four.eatery.user.vo.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.dao.DataAccessException;

@Mapper
public interface UserDAO {

    // 회원 정보 추가
    int insertUser(UserVO userVO) throws DataAccessException;

    // 중복 체크 메서드
    boolean isIdExist(@Param("mem_id") String mem_id) throws DataAccessException;

    boolean isEmailExist(@Param("email") String email) throws DataAccessException;

    boolean isNicknameExist(@Param("mem_nickname") String mem_nickname) throws DataAccessException;
}