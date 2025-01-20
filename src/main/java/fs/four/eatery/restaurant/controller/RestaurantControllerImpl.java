package fs.four.eatery.restaurant.controller;

import fs.four.eatery.restaurant.service.RestaurantService;
import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RestaurantControllerImpl implements RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Override
    @GetMapping("/restaurants")
    public List<RestaurantVO> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @Override
    @GetMapping("/restaurants/{name}")
    public RestaurantVO getRestaurantByName(@PathVariable("name") String name) {
        return restaurantService.getRestaurantByName(name);
    }

    @Override
    @GetMapping("/reviews/{restaurantName}")
    public List<ReviewVO> getReviewsByRestaurantName(@PathVariable("restaurantName") String restaurantName) {
        return restaurantService.getReviewsByRestaurantName(restaurantName);
    }

    @Override
    @GetMapping("/restaurants-with-reviews")
    public List<RestaurantVO> getAllRestaurantsWithReviews() {
        return restaurantService.getAllRestaurantsWithReviews();
    }
}