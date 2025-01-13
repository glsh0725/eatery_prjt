package fs.four.eatery.restaurant.service;

import fs.four.eatery.restaurant.vo.RestaurantVO;

import java.util.List;

public interface RestaurantService {

    List<RestaurantVO> getAllRestaurants();

    RestaurantVO getRestaurantByName(String name);
}