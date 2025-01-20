package fs.four.eatery.restaurant.service;

import fs.four.eatery.restaurant.dao.RestaurantDAO;
import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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
}