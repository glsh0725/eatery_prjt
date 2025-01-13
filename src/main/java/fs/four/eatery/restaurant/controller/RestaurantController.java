package fs.four.eatery.restaurant.controller;

import fs.four.eatery.restaurant.vo.RestaurantVO;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public interface RestaurantController {

    @GetMapping("/api/restaurants")
    List<RestaurantVO> getAllRestaurants();
}