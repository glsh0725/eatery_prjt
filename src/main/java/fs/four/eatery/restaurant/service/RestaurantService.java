package fs.four.eatery.restaurant.service;

import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;

import java.util.List;

public interface RestaurantService {

    List<RestaurantVO> getAllRestaurants();

    RestaurantVO getRestaurantByName(String name);

    List<ReviewVO> getReviewsByRestaurantName(String restaurantName);
}