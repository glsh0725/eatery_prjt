package fs.four.eatery.restaurant.dao;

import fs.four.eatery.restaurant.vo.RestaurantVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RestaurantDAO {
    void insertRestaurantData(RestaurantVO restaurant);
    boolean isRestaurantExist(String name);
}