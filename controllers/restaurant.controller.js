import { RestaurantDto } from "../models/dto/restaurant.dto.js";
import { RestaurantDao } from "../models/dao/restaurant.dao.js";
import { RestaurantValidate } from "../middlewares/validations/restaurant.validate.js";
import { ValidateAdminId, validateAdminId } from "../utilities/Id_validations/users.id.validation.js";

export class RestaurantController {

    static createRestaurant = async (req, res) => {
        const restaurantDto = new RestaurantDto(req.body);
        const restaurantDao = new RestaurantDao();

        try {

            await validateAdminId(req.body.adminId);

            const { error } = await RestaurantValidate.createRestaurant(restaurantDto);
            if (error) return res.status(400).json({error: error.message});

            const restaurant = await restaurantDao.createRestaurant(restaurantDto);

            return res.status(201).json({message: 'Restaurant created successfully', data: restaurant});

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message || 'Internal server error'});
        }
    }

    static getRestaurants = async (req, res) => {
        const restaurantDao = new RestaurantDao();

        try {
            const restaurants = await restaurantDao.getRestaurants();

            return res.status(200).json({message: 'Restaurants retrieved successfully', data: restaurants});

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message || 'Internal server error'});
        }
    }

    static getRestaurantById = async (req, res) => {
        const restaurantDao = new RestaurantDao();

        try {
            const restaurant = await restaurantDao.getRestaurantById(req.params.restaurantId);

            if (!restaurant) return res.status(404).json({error: 'Restaurant not found'});

            return res.status(200).json({message: 'Restaurant retrieved successfully', data: restaurant});

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message || 'Internal server error'});
        }
    }

    static updateRestaurant = async (req, res) => {
        const restaurantDto = new RestaurantDto(req.body);
        const restaurantDao = new RestaurantDao();
        restaurantDto.id = req.params.restaurantId;

        try {

            await ValidateAdminId(req.body.adminId);

            const { error } = await RestaurantValidate.updateRestaurant(restaurantDto);
            if (error) return res.status(400).json({error: error.message});

            const restaurant = await restaurantDao.updateRestaurant(restaurantDto);

            return res.status(200).json({message: 'Restaurant updated successfully', data: restaurant});

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error.message || 'Internal server error'});
        }
    }

}