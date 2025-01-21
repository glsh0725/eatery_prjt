package fs.four.eatery.restaurant.controller;

import fs.four.eatery.restaurant.service.RestaurantService;
import fs.four.eatery.restaurant.vo.RestaurantVO;
import fs.four.eatery.restaurant.vo.ReviewVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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
        return restaurantService.getLikesAndFavoritesByMember(memId);
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

    @PostMapping("/reviews/{restaurantName}")
    public ResponseEntity<?> submitReview(
            @PathVariable String restaurantName,
            @RequestParam("reviewScore") double reviewScore,
            @RequestParam("reviewContent") String reviewContent,
            @RequestParam("memberId") String memberId,
            @RequestParam(value = "reviewPhoto", required = false) MultipartFile reviewPhoto) {
        try {
            String projectDir = System.getProperty("user.dir");
            String uploadDir = projectDir + "/src/main/resources/static/images/reviews";

            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String photoName = null;

            if (reviewPhoto != null && !reviewPhoto.isEmpty()) {
                int fileCount = Objects.requireNonNull(directory.listFiles()).length;
                photoName = "review" + (fileCount + 1) + ".jpg";
                File destination = new File(directory, photoName);
                reviewPhoto.transferTo(destination);
            }

            ReviewVO review = new ReviewVO();
            review.setRestaurantName(restaurantName);
            review.setMemberId(memberId);
            review.setReviewScore(reviewScore);
            review.setReviewContent(reviewContent);
            review.setReviewPhotoName(photoName);
            review.setReviewLikes(0);

            restaurantService.addReview(review);

            refreshStaticResources(uploadDir);

            return ResponseEntity.ok("리뷰가 성공적으로 등록되었습니다!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("리뷰 등록 중 오류가 발생했습니다.");
        }
    }

    @Override
    @DeleteMapping("/reviews/{reviewNumber}")
    public ResponseEntity<?> deleteReview(@PathVariable("reviewNumber") int reviewNumber) {
        try {
            boolean isDeleted = restaurantService.deleteReview(reviewNumber);
            if (isDeleted) {
                return ResponseEntity.ok("리뷰가 성공적으로 삭제되었습니다!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("리뷰를 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("리뷰 삭제 중 오류가 발생했습니다.");
        }
    }

    @PutMapping("/reviews/{reviewNumber}")
    public ResponseEntity<?> updateReview(
            @PathVariable("reviewNumber") int reviewNumber,
            @RequestParam("reviewScore") double reviewScore,
            @RequestParam("reviewContent") String reviewContent,
            @RequestParam(value = "reviewPhoto", required = false) MultipartFile reviewPhoto) {
        try {
            String photoName = null;

            if (reviewPhoto != null && !reviewPhoto.isEmpty()) {
                String projectDir = System.getProperty("user.dir");
                String uploadDir = projectDir + "/src/main/resources/static/images/reviews";

                File directory = new File(uploadDir);
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                int fileCount = Objects.requireNonNull(directory.listFiles()).length;
                photoName = "review" + (fileCount + 1) + ".jpg";
                File destination = new File(directory, photoName);
                reviewPhoto.transferTo(destination);
            }

            ReviewVO review = new ReviewVO();
            review.setReviewNumber(reviewNumber);
            review.setReviewScore(reviewScore);
            review.setReviewContent(reviewContent);
            review.setReviewPhotoName(photoName);

            boolean isUpdated = restaurantService.updateReview(review);

            if (isUpdated) {
                return ResponseEntity.ok("리뷰가 성공적으로 수정되었습니다!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("리뷰를 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("리뷰 수정 중 오류가 발생했습니다.");
        }
    }

    private void refreshStaticResources(String directoryPath) {
        File directory = new File(directoryPath);
        if (directory.exists() && directory.isDirectory()) {
            for (File file : Objects.requireNonNull(directory.listFiles())) {
                file.setLastModified(System.currentTimeMillis());
            }
        }
    }

    @PatchMapping("/restaurants/{name}/viewCount")
    public ResponseEntity<?> incrementViewCount(@PathVariable String name) {
        try {
            restaurantService.incrementViewCount(name);
            return ResponseEntity.ok("조회수가 증가되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("조회수 증가 중 오류가 발생했습니다.");
        }
    }
}
