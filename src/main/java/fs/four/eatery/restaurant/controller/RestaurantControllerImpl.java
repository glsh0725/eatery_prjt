package fs.four.eatery.restaurant.controller;

import fs.four.eatery.restaurant.service.RestaurantService;
import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @Override
    @GetMapping("/likes-and-favorites/{memId}")
    public Map<String, List<String>> getLikesAndFavorites(@PathVariable("memId") String memId) {
        Map<String, List<String>> data = restaurantService.getLikesAndFavoritesByMember(memId);
        return data;
    }

    @Override
    @PostMapping("/likes/toggle")
    public ResponseEntity<Boolean> toggleLike(@RequestBody Map<String, String> requestData) {
        String memId = requestData.get("memId");
        String resName = requestData.get("resName");

        if (memId == null || resName == null) {
            return ResponseEntity.badRequest().body(null);
        }

        boolean isLiked = restaurantService.toggleLike(memId, resName);
        return ResponseEntity.ok(isLiked);
    }

    @Override
    @PostMapping("/favorites/toggle")
    public ResponseEntity<Boolean> toggleFavorite(@RequestBody Map<String, String> requestData) {
        String memId = requestData.get("memId");
        String resName = requestData.get("resName");

        if (memId == null || resName == null) {
            return ResponseEntity.badRequest().body(null);
        }

        boolean isFavorited = restaurantService.toggleFavorite(memId, resName);
        return ResponseEntity.ok(isFavorited);
    }
}