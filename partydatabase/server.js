var orm = require("./config/orm.js");
orm.showSelection("*", "parties");
orm.showSelection("*", "clients");
orm.selectWhere("parties","party_type", "grown-up");
orm.leftJoin("*", "clients", "parties" , "id", "client_id");

