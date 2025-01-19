package fs.four.eatery.restaurant.service;

import fs.four.eatery.restaurant.dao.RestaurantDAO;
import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantDAO restaurantDAO;

    @Override
    public List<RestaurantVO> getAllRestaurants() {
        return restaurantDAO.getAllRestaurants();
    }

    @Override
    public RestaurantVO getRestaurantByName(String name) {
        return restaurantDAO.findRestaurantByName(name);
    }

    @Override
    public List<ReviewVO> getReviewsByRestaurantName(String restaurantName) {
        return restaurantDAO.findReviewsByRestaurantName(restaurantName);
    }
}