package fs.four.eatery.restaurant.controller;

import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;

import java.util.List;

public interface RestaurantController {
    List<RestaurantVO> getAllRestaurants();
    RestaurantVO getRestaurantByName(String name);
    List<ReviewVO> getReviewsByRestaurantName(String restaurantName);
    List<RestaurantVO> getAllRestaurantsWithReviews();
}