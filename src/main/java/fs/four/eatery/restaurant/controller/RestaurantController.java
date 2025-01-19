package fs.four.eatery.restaurant.controller;

import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface RestaurantController {

    @GetMapping("/api/restaurants")
    List<RestaurantVO> getAllRestaurants();

    @GetMapping("/api/restaurants/{name}")
    RestaurantVO getRestaurantByName(@PathVariable("name") String name);

    @GetMapping("/api/reviews/{restaurantName}")
    List<ReviewVO> getReviewsByRestaurantName(@PathVariable("restaurantName") String restaurantName);
}