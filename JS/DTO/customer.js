class customer{
    constructor(id, name, phoneNumber, email, address, idAcc){
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.idAcc = idAcc;
    }
}

function getCustomerByIdAccount(idAcc){
    lsCustomer = JSON.parse(data.getItem("listCustomer"));
    for(i = 0; i < lsCustomer.length; i++){
        if(lsCustomer[i].idAcc == idAcc){
            return lsCustomer[i];
        }
    }
}