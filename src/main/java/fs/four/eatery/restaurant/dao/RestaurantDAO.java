package fs.four.eatery.restaurant.dao;

import fs.four.eatery.restaurant.vo.RestaurantVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RestaurantDAO {
    void insertRestaurantData(RestaurantVO restaurant);
    boolean isRestaurantExist(String name);
    List<RestaurantVO> getAllRestaurants();
    RestaurantVO findRestaurantByName(@Param("name") String name);
}