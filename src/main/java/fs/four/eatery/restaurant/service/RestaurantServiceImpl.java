package fs.four.eatery.restaurant.service;

import fs.four.eatery.restaurant.dao.RestaurantDAO;
import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantDAO restaurantDAO;

    @Override
    @Cacheable(value = "restaurants")
    public List<RestaurantVO> getAllRestaurants() {
        return restaurantDAO.getAllRestaurants();
    }

    @Override
    @CacheEvict(value = "restaurant", key = "#name")
    public RestaurantVO getRestaurantByName(String name) {
        return restaurantDAO.findRestaurantByName(name);
    }

    @Override
    @CacheEvict(value = "reviews", key = "#restaurantName")
    public List<ReviewVO> getReviewsByRestaurantName(String restaurantName) {
        return restaurantDAO.findReviewsByRestaurantName(restaurantName);
    }

    @Override
    @Cacheable(value = "restaurantsWithReviews")
    public List<RestaurantVO> getAllRestaurantsWithReviews() {
        return restaurantDAO.getAllRestaurantsWithReviews();
    }

    @Override
    public Map<String, List<String>> getLikesAndFavoritesByMember(String memId) {
        Map<String, String> result = restaurantDAO.getLikesAndFavoritesByMember(memId);

        if (result == null) {
            result = new HashMap<>();
            result.put("LIKES", "");
            result.put("FAVORITES", "");
        }

        List<String> likes = result.get("LIKES") == null || result.get("LIKES").trim().isEmpty()
                ? new ArrayList<>()
                : Arrays.asList(result.get("LIKES").split(","));

        List<String> favorites = result.get("FAVORITES") == null || result.get("FAVORITES").trim().isEmpty()
                ? new ArrayList<>()
                : Arrays.asList(result.get("FAVORITES").split(","));

        Map<String, List<String>> data = new HashMap<>();
        data.put("likes", likes);
        data.put("favorites", favorites);

        return data;
    }

    @Override
    public boolean toggleLike(String memId, String resName) {
        ensureInitializedLikesAndFavorites(memId);

        Map<String, List<String>> data = getLikesAndFavoritesByMember(memId);

        List<String> likes = new ArrayList<>(data.get("likes"));
        boolean isLiked = toggleItem(likes, resName);

        if (isLiked) {
            restaurantDAO.incrementLikeCount(resName);
        } else {
            restaurantDAO.decrementLikeCount(resName);
        }

        restaurantDAO.updateLikesAndFavorites(memId, String.join(",", likes), String.join(",", data.get("favorites")));
        return isLiked;
    }

    @Override
    public boolean toggleFavorite(String memId, String resName) {
        ensureInitializedLikesAndFavorites(memId);

        Map<String, List<String>> data = getLikesAndFavoritesByMember(memId);

        List<String> favorites = new ArrayList<>(data.get("favorites"));
        boolean isFavorited = toggleItem(favorites, resName);

        restaurantDAO.updateLikesAndFavorites(memId, String.join(",", data.get("likes")), String.join(",", favorites));
        return isFavorited;
    }

    @Override
    public void addReview(ReviewVO review) {
        Integer maxReviewNumber = restaurantDAO.getMaxReviewNumber();
        int nextReviewNumber = (maxReviewNumber != null ? maxReviewNumber : 0) + 1;

        review.setReviewNumber(nextReviewNumber);

        restaurantDAO.insertReview(review);
    }

    private void ensureInitializedLikesAndFavorites(String memId) {
        if (restaurantDAO.getLikesAndFavoritesByMember(memId) == null) {
            restaurantDAO.initializeResToUpdate(memId);
        }
    }

    private List<String> parseList(String data) {
        return (data == null || data.isEmpty()) ? new ArrayList<>() : Arrays.asList(data.split(","));
    }

    private boolean toggleItem(List<String> list, String item) {
        if (list.contains(item)) {
            list.remove(item);
            return false;
        } else {
            list.add(item);
            return true;
        }
    }
}