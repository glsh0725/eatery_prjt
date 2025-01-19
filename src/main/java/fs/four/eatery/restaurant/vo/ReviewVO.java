package fs.four.eatery.restaurant.vo;

public class ReviewVO {
    private int reviewNumber;          // 리뷰 번호
    private String restaurantName;     // 식당 이름 (외래키)
    private String memberId;           // 작성자 ID (외래키)
    private double reviewScore;           // 리뷰 점수
    private String reviewContent;      // 리뷰 내용
    private String reviewPhotoName;    // 리뷰 사진 이름
    private int reviewLikes;           // 리뷰 좋아요 수

    public int getReviewNumber() {
        return reviewNumber;
    }
    public void setReviewNumber(int reviewNumber) {
        this.reviewNumber = reviewNumber;
    }
    public String getRestaurantName() {
        return restaurantName;
    }
    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }
    public String getMemberId() {
        return memberId;
    }
    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }
    public double getReviewScore() {
        return reviewScore;
    }
    public void setReviewScore(double reviewScore) {
        this.reviewScore = reviewScore;
    }
    public String getReviewContent() {
        return reviewContent;
    }
    public void setReviewContent(String reviewContent) {
        this.reviewContent = reviewContent;
    }
    public String getReviewPhotoName() {
        return reviewPhotoName;
    }
    public void setReviewPhotoName(String reviewPhotoName) {
        this.reviewPhotoName = reviewPhotoName;
    }
    public int getReviewLikes() {
        return reviewLikes;
    }
    public void setReviewLikes(int reviewLikes) {
        this.reviewLikes = reviewLikes;
    }
}