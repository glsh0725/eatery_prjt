package fs.four.eatery.restaurant.dao;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;

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

    @Override
    public List<RestaurantVO> getAllRestaurantsWithReviews() {
        return sqlSession.selectList(NAMESPACE + ".getAllRestaurantsWithReviews");
    }

    @Override
    public Map<String, String> getLikesAndFavoritesByMember(String memId) {
        Map<String, String> result = sqlSession.selectOne(NAMESPACE + ".getLikesAndFavoritesByMember", memId);

        if (result == null) {
            initializeResToUpdate(memId);
            result = new HashMap<>();
            result.put("likes", "");
            result.put("favorites", "");
        }
        return result;
    }

    @Override
    public void updateLikesAndFavorites(String memId, String likes, String favorites) {
        Map<String, Object> params = new HashMap<>();
        params.put("memId", memId);
        params.put("likes", likes);
        params.put("favorites", favorites);

        sqlSession.update(NAMESPACE + ".updateLikesAndFavorites", params);
    }

    @Override
    public void initializeResToUpdate(String memId) {
        sqlSession.insert(NAMESPACE + ".initializeResToUpdate", memId);
    }
}