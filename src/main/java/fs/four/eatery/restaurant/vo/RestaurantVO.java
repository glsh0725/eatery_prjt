package fs.four.eatery.restaurant.vo;

import java.util.List;

public class RestaurantVO {
    private String name;           // 식당 이름
    private String address;        // 주소
    private String oldAddress;     // 지번
    private String category;       // 카테고리
    private String phoneNumber;    // 전화번호
    private String homepage;       // 홈페이지 URL
    private String openTime;       // 영업시간
    private String breakTime;      // 휴게시간
    private String offDays;        // 휴무일
    private String tags;           // 태그
    private String parkingInfo;    // 주차 정보
    private String photoName;      // 사진 이름
    private String menuName;       // 메뉴 이미지 이름
    private String scoreNumber;       // 평점
    private int likeCount;         // 좋아요 수
    private int viewCount;         // 조회수
    private int reviewCount;       // 리뷰 수
    private List<ReviewVO> reviews; // 리뷰 리스트 추가

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getOldAddress() {
        return oldAddress;
    }
    public void setOldAddress(String oldAddress) {
        this.oldAddress = oldAddress;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getHomepage() {
        return homepage;
    }
    public void setHomepage(String homepage) {
        this.homepage = homepage;
    }
    public String getOpenTime() {
        return openTime;
    }
    public void setOpenTime(String openTime) {
        this.openTime = openTime;
    }
    public String getBreakTime() {
        return breakTime;
    }
    public void setBreakTime(String breakTime) {
        this.breakTime = breakTime;
    }
    public String getOffDays() {
        return offDays;
    }
    public void setOffDays(String offDays) {
        this.offDays = offDays;
    }
    public String getTags() {
        return tags;
    }
    public void setTags(String tags) {
        this.tags = tags;
    }
    public String getParkingInfo() {
        return parkingInfo;
    }
    public void setParkingInfo(String parkingInfo) {
        this.parkingInfo = parkingInfo;
    }
    public String getPhotoName() {
        return photoName;
    }
    public void setPhotoName(String photoName) {
        this.photoName = photoName;
    }
    public String getMenuName() {
        return menuName;
    }
    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }
    public String getScoreNumber() {
        return scoreNumber;
    }
    public void setScoreNumber(String scoreNum) {
        this.scoreNumber = scoreNum;
    }
    public int getLikeCount() {
        return likeCount;
    }
    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }
    public int getViewCount() {
        return viewCount;
    }
    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }
    public int getReviewCount() {
        return reviewCount;
    }
    public void setReviewCount(int reviewCount) {
        this.reviewCount = reviewCount;
    }
    public List<ReviewVO> getReviews() {
        return reviews;
    }
    public void setReviews(List<ReviewVO> reviews) {
        this.reviews = reviews;
    }
}