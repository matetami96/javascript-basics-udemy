"use strict";
const customers = ["Tomi", "Moci", "Zsolt"];
const activeCustomers = ["Tomi", "Moci"];
const inactiveCustomers = _.difference(customers, activeCustomers);
console.log(inactiveCustomers);
