package fs.four.eatery.restaurant.service;

import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;

import java.util.List;
import java.util.Map;

public interface RestaurantService {

    List<RestaurantVO> getAllRestaurants();
    RestaurantVO getRestaurantByName(String name);
    List<ReviewVO> getReviewsByRestaurantName(String restaurantName);
    List<RestaurantVO> getAllRestaurantsWithReviews();
    Map<String, List<String>> getLikesAndFavoritesByMember(String memId);
    boolean toggleLike(String memId, String resName);
    boolean toggleFavorite(String memId, String resName);
    void addReview(ReviewVO review);
    boolean deleteReview(int reviewNumber);
    boolean updateReview(ReviewVO review);
    void incrementViewCount(String name);
}