export class MenuDto {
  constructor(bodyReq) {
    this.userId = bodyReq.userId;
    this.restaurantId = bodyReq.restaurantId;
    this.id = bodyReq.id;
    this.menuTypes = bodyReq.menuTypes;
    this.name = bodyReq.name;
    this.ingredients = bodyReq.ingredients;
    this.price = bodyReq.price;
    this.image = bodyReq.image;
    this.isDeleted = bodyReq.isDeleted;
  }
}