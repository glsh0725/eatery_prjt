package fs.four.eatery.restaurant.controller;

import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

public interface RestaurantController {

    List<RestaurantVO> getAllRestaurants();

    RestaurantVO getRestaurantByName(String name);

    List<ReviewVO> getReviewsByRestaurantName(String restaurantName);

    List<RestaurantVO> getAllRestaurantsWithReviews();

    Map<String, List<String>> getLikesAndFavorites(String memId);

    ResponseEntity<Boolean> toggleLike(Map<String, String> requestData);

    ResponseEntity<Boolean> toggleFavorite(Map<String, String> requestData);

    ResponseEntity<?> deleteReview(int reviewNumber);

    ResponseEntity<?> incrementViewCount(@PathVariable String name);
}