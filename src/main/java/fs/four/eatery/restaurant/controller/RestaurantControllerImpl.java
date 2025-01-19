package fs.four.eatery.restaurant.controller;

import fs.four.eatery.restaurant.service.RestaurantService;
import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestaurantControllerImpl implements RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public List<RestaurantVO> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @Override
    public RestaurantVO getRestaurantByName(String name) {
        return restaurantService.getRestaurantByName(name);
    }

    @Override
    public List<ReviewVO> getReviewsByRestaurantName(String restaurantName) {
        return restaurantService.getReviewsByRestaurantName(restaurantName);
    }
}