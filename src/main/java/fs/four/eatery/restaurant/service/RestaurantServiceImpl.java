package fs.four.eatery.restaurant.service;

import fs.four.eatery.restaurant.dao.RestaurantDAO;
import fs.four.eatery.restaurant.vo.RestaurantVO;
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
}