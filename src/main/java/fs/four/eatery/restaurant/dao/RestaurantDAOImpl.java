package fs.four.eatery.restaurant.dao;

import fs.four.eatery.restaurant.vo.RestaurantVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RestaurantDAOImpl implements RestaurantDAO {

    @Autowired
    private SqlSession sqlSession;

    private static final String NAMESPACE = "fs.four.eatery.restaurant.dao.RestaurantDAO";

    @Override
    public void insertRestaurantData(RestaurantVO restaurant) {
        sqlSession.insert(NAMESPACE + ".insertRestaurantData", restaurant);
    }

    @Override
    public boolean isRestaurantExist(String name) {
        return sqlSession.selectOne(NAMESPACE + ".isRestaurantExist", name) != null;
    }
}