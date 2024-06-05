export default class tableModel{
    constructor(id,name,price,quantity,total,remove) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._total = total;
        this._remove = remove;
    }
}