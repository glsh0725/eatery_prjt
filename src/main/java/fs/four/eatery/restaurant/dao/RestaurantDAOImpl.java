package fs.four.eatery.restaurant.dao;

import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

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
        return sqlSession.selectOne(NAMESPACE + ".isRestaurantExist", name);
    }

    @Override
    public List<RestaurantVO> getAllRestaurants() {
        return sqlSession.selectList(NAMESPACE + ".getAllRestaurants");
    }

    @Override
    public RestaurantVO findRestaurantByName(String name) {
        return sqlSession.selectOne(NAMESPACE + ".findRestaurantByName", name);
    }

    @Override
    public List<ReviewVO> findReviewsByRestaurantName(String restaurantName) {
        return sqlSession.selectList(NAMESPACE + ".findReviewsByRestaurantName", restaurantName);
    }
}