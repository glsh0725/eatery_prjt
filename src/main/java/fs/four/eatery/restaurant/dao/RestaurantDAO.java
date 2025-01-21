package fs.four.eatery.restaurant.dao;

import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface RestaurantDAO {
    void insertRestaurantData(RestaurantVO restaurant);
    void incrementLikeCount(@Param("name") String resName);
    void decrementLikeCount(@Param("name") String resName);
    boolean isRestaurantExist(String name);
    List<RestaurantVO> getAllRestaurants();
    List<RestaurantVO> getAllRestaurantsWithReviews();
    RestaurantVO findRestaurantByName(@Param("name") String name);
    List<ReviewVO> findReviewsByRestaurantName(@Param("restaurantName") String restaurantName);
    Map<String, String> getLikesAndFavoritesByMember(@Param("memId") String memId);

    void updateLikesAndFavorites(
            @Param("memId") String memId,
            @Param("likes") String likes,
            @Param("favorites") String favorites
    );

    void initializeResToUpdate(@Param("memId") String memId);

    void insertReview(ReviewVO review);

    Integer getMaxReviewNumber();

    int deleteReviewById(@Param("reviewNumber") int reviewNumber);

    int updateReview(ReviewVO review);

    void incrementViewCount(@Param("name") String name);
}