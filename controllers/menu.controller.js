import { MenuDto } from "../models/dto/menu.dto.js";
import { MenuDao } from "../models/dao/menu.dao.js";
import { MenuValidate } from "../middlewares/validations/menu.validate.js";
import { validateUserId } from "../utilities/Id_validations/users.id.validation.js";
import { validateRestaurantId } from "../utilities/Id_validations/hotelServices.id.validate.js";


export class MenuController {
    static createMenu = async (req, res) => {
        const menuDto = new MenuDto(req.body);
        if (req.file) menuDto.image = req.file.path;

        const menuDao = new MenuDao();

        try {

            await validateUserId(req.body.userId);
            await validateRestaurantId(req.body.restaurantId);

            const { error } = await MenuValidate.createMenu(menuDto);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const menu = await menuDao.createMenu(menuDto);
            res.status(201).json({ message: 'Menu created successfully', data: menu });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    static getAllMenus = async (req, res) => {
        const menuDao = new MenuDao();

        try {
            const menus = await menuDao.getAllMenus();
            res.status(200).json({ message: 'All menus fetched successfully', data: menus });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    static getMenuById = async (req, res) => {
        const menuDao = new MenuDao();

        try {
            const menu = await menuDao.getMenuById(req.params.menuId);
            res.status(200).json({ message: 'Menu fetched successfully', data: menu });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    static getMenusByRestaurantId = async (req, res) => {
        const menuDao = new MenuDao();

        try {
            await validateRestaurantId(req.body.restaurantId);

            const menus = await menuDao.getMenusByRestaurantId(req.params.restaurantId);
            res.status(200).json({ message: 'Menus fetched successfully', data: menus });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    static getMenuByUserId = async (req, res) => {
        const menuDao = new MenuDao();

        try {

            await validateUserId(req.body.userId);

            const menus = await menuDao.getMenuByUserId(req.params.userId);
            res.status(200).json({ message: 'Menus fetched successfully', data: menus });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    static updateMenu = async (req, res) => {
        const menuDto = new MenuDto(req.body);
        menuDto.id = req.params.menuId;
        if (req.file) menuDto.image = req.file.path;

        const menuDao = new MenuDao();

        try {

            await validateUserId(req.body.userId);
            await validateRestaurantId(req.body.restaurantId);

            const { error } = await MenuValidate.updateMenu(menuDto);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const menu = await menuDao.updateMenu(menuDto);
            res.status(200).json({ message: 'Menu updated successfully', data: menu });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    static deleteMenu = async (req, res) => {
        const menuDao = new MenuDao();

        try {
            const menu = await menuDao.deleteMenu(req.params.menuId);
            res.status(200).json({ message: 'Menu deleted successfully', data: menu });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }
}