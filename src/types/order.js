export var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Draft"] = 1] = "Draft";
    OrderStatus[OrderStatus["Pending"] = 2] = "Pending";
    OrderStatus[OrderStatus["Completed"] = 3] = "Completed";
    OrderStatus[OrderStatus["Failed"] = 4] = "Failed";
    OrderStatus[OrderStatus["Cancelled"] = 5] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
