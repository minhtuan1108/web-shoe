//thêm sắp xếp , tg mặc định bé đến lớn
var listStatistic = []
function displayTK() {   
    document.getElementById('DSSP').style.display = "none";   
    document.getElementById('SSP').style.display = "none";
    document.getElementById('DH').style.display = "none";
    document.getElementById('ND').style.display = "none";
    document.getElementById('TK').style.display = "block";
    displayAllStatistic();
}
function displayAllStatistic(){
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;
    let brand= document.getElementById('brands').value;
    let lsProduct = JSON.parse(localStorage.getItem("listProduct"))
    let listOrder =JSON.parse(localStorage.getItem("listBill"))
    let listOrderDetail =JSON.parse(localStorage.getItem("listBillDetail"))
    let lsbrands = []
    // console.log(listOrder)
    // console.log(listOrderDetail)
    // console.log(lsProduct)

    //THỐNG KÊ THEO SẢN PHẨM
    let str1='  <tr>\n '+
    '   <td class="table_pd_second_column text_center">Tên sản phẩm</td>\n' +
    '   <td class="table_pd_second_column text_center">Số lượng bán được</td>\n' +
    '   <td class="table_pd_second_column text_center">Chiếm tỉ lệ</td>\n' +
    '   <td class="table_pd_second_column text_center">Doanh thu</td>\n' +
    '   <td class="table_pd_second_column text_center">Chiếm tỉ lệ</td>\n' +
    '   <td class="table_pd_second_column text_center">Chi tiết sản phẩm</td>\n' +
    '   </tr>';
   
        var sl = []
        var tong=0
        var tile =[]
        var dt = []
        var tongdt=0
        var tiledt =[]
        var list=[]
        for(let j=0;j < lsProduct.length;j++)
            {
                sl[j]=0
                dt[j]=0
                list[j]=0
                tile[j]=0
                tiledt[j]=0
            }
        let a=0;
        // Lọc theo thương hiệu
        if(brand==0)
            lsbrands=lsProduct;
        else if(brand==1)
        {
            for(let i=0;i<lsProduct.length;i++)
                if(lsProduct[i].brand=="Asics")
                    lsbrands.push(lsProduct[i])
        }
        else if(brand==2)
        {
            for(let i=0;i<lsProduct.length;i++)
                if(lsProduct[i].brand=="Mizuno")
                    lsbrands.push(lsProduct[i])
        }
        else if(brand==3)
        {
            for(let i=0;i<lsProduct.length;i++)
                if(lsProduct[i].brand=="Beyono")
                    lsbrands.push(lsProduct[i])
        }
        else if(brand==4)
        {
            for(let i=0;i<lsProduct.length;i++)
                if(lsProduct[i].brand=="Nike")
                    lsbrands.push(lsProduct[i])
        }
        else if(brand==5)
        {
            for(let i=0;i<lsProduct.length;i++)
                if(lsProduct[i].brand=="Adidas")
                    lsbrands.push(lsProduct[i])
        }
        // Lọc theo ngày
        if(start != '' && end != '' && start > end)
            alert('Lỗi ngày');
        else{
            if(start == '' && end == '')
                list=listOrderDetail;           
            else if(start == '' && end != ''){
                for (let i = 0; i < listOrder.length; i++) 
                    if(listOrder[i].date < end)
                    {
                        console.log(listOrder[i].orderID)
                        for(let j=0;j<listOrderDetail.length;j++)
                            if(listOrder[i].orderID==listOrderDetail[j].orderID)
                            {
                                list[a]=listOrderDetail[j];
                                a++;
                            }
                    }
            }
            else if(start != '' && end == ''){
                for (let i = 0; i < listOrder.length; i++) 
                    if(listOrder[i].date > start)
                    {
                        console.log(listOrder[i].orderID)
                        for(let j=0;j<listOrderDetail.length;j++)
                            if(listOrder[i].orderID==listOrderDetail[j].orderID)
                            {
                                list[a]=listOrderDetail[j];
                                a++;
                            }
                    }
            }
            else{
                for (let i = 0; i < listOrder.length; i++) 
                    if(listOrder[i].date > start && listOrder[i].date < end)
                    {
                        console.log(listOrder[i].orderID)
                        for(let j=0;j<listOrderDetail.length;j++)
                            if(listOrder[i].orderID==listOrderDetail[j].orderID)
                            {
                                list[a]=listOrderDetail[j];
                                a++;
                            }    
                    }
                }
        }
        // Tính toán số liệu
        for(let j=0;j < lsbrands.length;j++)
            {
            for(let i=0;i<list.length;i++)
            {
                 if(lsbrands[j].id == list[i].idProduct)
                 {
                    tong += list[i].quantity
                    tongdt += list[i].quantity * lsbrands[j].price
                    sl[j] += list[i].quantity //tính số lượng
                    dt[j] += list[i].quantity * lsbrands[j].price//tính doanh thu
                 }
            }
        }
        for(let j=0;j < lsbrands.length;j++)
        {
           tile[j]= Math.round((sl[j]/tong)*10000)/100 //tính phần trăm
           tiledt[j]= Math.round((dt[j]/tongdt)*10000)/100
        }

        for(let j=0;j < lsbrands.length;j++)
        {         
            var brands=lsbrands[j]
            str1 += '<tr class="a_client">'+
            '<td class="text_center">'+lsbrands[j].name +'</td>' +
            '<td class="text_center">'+ sl[j] +'</td>' +
            '<td class="text_center">'+ tile[j]+'%' +'</td>' +
            '<td class="text_center">'+ dt[j] +'</td>' +
            '<td class="text_center">'+ tiledt[j]+'%' +'</td>' +
            `<td class="text_center"><button class="btn" id="ct" onclick="openDetailProduct('${brands.id}')">Xem</button></td>` +
            '</tr>'
        }

        str1 += '<tr class="a_client">'+
            '<td class="text_center"><h4>Tổng</h4></td>' +
            '<td class="text_center"><h4>'+ tong +'</h4></td>' +
            '<td class="text_center"><h4>100%</h4></td>' +
            '<td class="text_center"><h4>'+ tongdt +'</h4></td>' +
            '<td class="text_center"><h4>100%</h4></td>' +
            '</tr>'

    document.getElementById("ByProduct").innerHTML = str1;
    //THỐNG KÊ THEO NGÀY
    let str2='  <tr>\n '+
    '   <td class="table_pd_second_column text_center">Ngày</td>\n' +
    '   <td class="table_pd_second_column text_center">Số đơn hàng bán được</td>\n' +
    '   <td class="table_pd_second_column text_center">Chiếm tỉ lệ</td>\n' +
    '   <td class="table_pd_second_column text_center">Số sản phẩm bán được</td>\n' +
    '   <td class="table_pd_second_column text_center">Chiếm tỉ lệ</td>\n' +
    '   <td class="table_pd_second_column text_center">Doanh thu</td>\n' +
    '   <td class="table_pd_second_column text_center">Chiếm tỉ lệ</td>\n' +
    '   <td class="table_pd_second_column text_center">Chi tiết</td>\n' +
    '   </tr>';
    
        var day = []
        var dh= []
        var sp =[]
        var dtday = []
        var tldh = []
        var tlsp = []
        var tldt = []
        var tongdhngay=0
        var tongspngay=0
        var tongdtngay=0
        //console.log(listOrder)
        let b=0;
        //Lọc theo ngày
        if(start != '' && end != '' && start > end)
            alert('Lỗi ngày');
        else{
            for(let i=0;i<listOrder.length;i++)
        {
            day[i] = listOrder[i].date
            dh[i] = 0
            sp[i] = 0
            dtday[i] = 0
        }
            if(start == '' && end == '')
                {}          
            else if(start == '' && end != ''){
                for (let i = 0; i < listOrder.length; i++) 
                    if(listOrder[i].date < end)
                    {
                        day[b]=listOrder[i].date
                        b++;
                    }
            }
            else if(start != '' && end == ''){
                for (let i = 0; i < listOrder.length; i++) 
                    if(listOrder[i].date > start)
                    {
                        day[b]=listOrder[i].date
                        b++;
                    }
            }
            else{
                for (let i = 0; i < listOrder.length; i++) 
                    if(listOrder[i].date > start && listOrder[i].date < end)
                    {
                        day[b]=listOrder[i].date
                        b++;  
                    }
                }
        }
        for(let i=0;i<day.length;i++)
        {
            let temp= day[i]
            for (let j = i+1; j < day.length; j++)
                if(temp == day[j])
                {
                    day.splice(j, 1);
                    i--;
                }
        }
        // for(let a=0;a<lsbrands.length;a++)
        // {
        //     for(let b = 0; b< listOrderDetail.length;b++)
        //     {
        //         if(lsbrands[a].id == listOrderDetail[b].idProduct)
        //         {
                    for(let i=0;i<listOrder.length;i++)
                    {
                        for(let j = 0; j< day.length;j++)
                        {
                            if(day[j] == listOrder[i].date)
                            {
                                for(let a=0;a<lsbrands.length;a++)
                                {
                                 for(let b = 0; b< listOrderDetail.length;b++)
                                 {
                                     if(lsbrands[a].id == listOrderDetail[b].idProduct)
                                    {
                                        tongdhngay++;
                                        dh[j]++;//cộng hóa đơn trong ngày
                                        b=listOrderDetail.length;
                                        a=lsbrands.length;
                                    }
                                 }
                                }
                                for(let k = 0;k<listOrderDetail.length;k++)
                                {
                                    if(listOrder[i].orderID==listOrderDetail[k].orderID)
                                     {    
                                        
                                        for(let z=0;z < lsbrands.length;z++)
                                        {
                                        //console.log(lsbrands[z])
                                            if(lsbrands[z].id == listOrderDetail[k].idProduct)
                                            {   
                                                console.log(listOrderDetail[k].quantity) 
                                                sp[j]+= listOrderDetail[k].quantity
                                                tongspngay+= listOrderDetail[k].quantity
                                                tongdtngay += listOrderDetail[k].quantity * lsbrands[z].price
                                                dtday[j] += listOrderDetail[k].quantity * lsbrands[z].price//tính doanh thu 
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
        //         }
        //     }
        // }
        for(let j=0;j < lsbrands.length;j++)
        {
        tldt[j]= Math.round((dtday[j]/tongdtngay)*10000)/100
        tlsp[j]= Math.round((sp[j]/tongspngay)*10000)/100
        tldh[j]= Math.round((dh[j]/tongdhngay)*10000)/100
        }
        for(let j=0;j < day.length;j++)
        {      
            // var date = new Date(day[j])
            // console.log(date)
            str2 += '<tr class="a_client">'+
            '<td class="text_center">'+day[j] +'</td>' +
            '<td class="text_center">'+ dh[j] +'</td>' +
            '<td class="text_center">'+ tldh[j] +'%</td>' +
            '<td class="text_center">'+ sp[j] +'</td>' +
            '<td class="text_center">'+ tlsp[j] +'%</td>' +
            '<td class="text_center">'+ dtday[j] +'</td>' +
            '<td class="text_center">'+ tldt[j] +'%</td>' +
            `<td class="text_center"><button class="btn" id="ct" onclick="openDetailDay(${day[j]})">Xem</button></td>` +
            '</tr>'
        }
        str2 += '<tr class="a_client">'+
            '<td class="text_center"><h4>Tổng</h4></td>' +
            '<td class="text_center"><h4>'+ tongdhngay +'</h4></td>' +
            '<td class="text_center"><h4>100%</h4></td>' +
            '<td class="text_center"><h4>'+ tongspngay +'</h4></td>' +
            '<td class="text_center"><h4>100%</h4></td>' +
            '<td class="text_center"><h4>'+ tongdtngay +'</h4></td>' +
            '<td class="text_center"><h4>100%</h4></td>' +
            '</tr>'
    document.getElementById("ByTime").innerHTML = str2;
    }

function openDetailProduct(id){
    console.log(id)
    document.getElementById("modalproduct").style.display = "flex";
    let lsProduct = JSON.parse(localStorage.getItem('listProduct'));
    let lsProductDetail = JSON.parse(localStorage.getItem("listProductDetail"))
    let chitiet
    for(let i=0;i<lsProduct.length;i++)
        if(lsProduct[i].id==id)
        {
            chitiet = `
            <div id="left">
                    <ul>
                        <li>Mã sản phẩm</li>
                        <li>Tên sản phẩm</li>
                        <li style="height: 110px">Hình ảnh</li>
                        <li>Thương hiệu</li>
                        <li>Số lượng</li>
                        <li>Giá</li>
                        <li>Loại</li>
                    </ul>
                </div>
            <div id="right">
            <ul>
            <li class="text_center">${lsProduct[i].id}</li>
            <li class="text_center">${lsProduct[i].name}</li>
            <li class="text_center"><img class="size_img" src="${lsProduct[i].image}"></li>
            <li class="text_center">${lsProduct[i].brand}</li>
            <li class="text_center">${lsProductDetail[i].quantity}</li>
            <li class="text_center">${lsProduct[i].price}</li>
            <li class="text_center">${lsProduct[i].type}</li>
            </ul>
            </div>`
        }
    document.getElementById("showDetailByProduct").innerHTML = chitiet;
}
function closeDetailProduct(){
    document.getElementById("modalproduct").style.display = "none";  
}
function openDetailDay(day){
    console.log(day)
    document.getElementById("modalday").style.display = "flex";
    let listOrder =JSON.parse(localStorage.getItem("listBill"))
    let str =   '   <tr>\n '+
    '   <td class="table_pd_first_column text_center">Mã đơn hàng</td>\n' +
    '   <td class="table_pd_second_column text_center">Mã khách hàng</td>\n' +
    '   <td class="table_pd_fouth_column text_center">Giá đơn hàng</td>\n' +
    '   </tr>';
    for(let i=0;i<listOrder.length;i++)
    {
        var date = new Date(day)
        console.log(date)
       // if(day== listOrder[i].date) //ngày tự tạo khi lấy giá trị bị sai (2022-12-10 =2000)
        {
            str +=  '<tr><td class="text_center">' + listOrder[i].id + '</td>' +
                    '<td class="text_center">' + listOrder[i].idKH + '</td>' +
                    '<td class="text_center">' + listOrder[i].total + '</td>';               
        }
    }
    document.getElementById("showDetailByDay").innerHTML = str;
}
function closeDetailDay(){
   document.getElementById("modalday").style.display = "none"; 
}


