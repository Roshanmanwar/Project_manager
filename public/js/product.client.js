window.addEventListener('load',()=>{
    let list=[];
    let tbody = document.getElementById('tbody');
    let saveNewProductBtn = document.querySelector('#btnSave');

    saveNewProductBtn.addEventListener('click',async ()=>{
        let newProduct={
                productName:document.querySelector('#productName').value,
                qty:document.querySelector('#qty').value,
                price:document.querySelector('#price').value,
                mdate:document.querySelector('#mdate').value,
        }   
        let url = `http://localhost:3031/api/save-new-product`;
        let option = {
            method : "POST",
            header : {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newProduct),
        };

        try {
       
        let response = await fetch(url,option)
        let data =  await response.json();
        console.log(data);
             
    } catch (error) {
        console.log(error);
            
    }
    })

    async function getProductDetails()
    {
        let url = 'http://localhost:3040/api/get-product';
        let response = await fetch(url,{method: "GET"});
        let data =  await response.json();
        if(data.status === true)
        {
            list = data.result;
            printData(list);
        }
        else
        {
            alert(data.message)
       }
    }

    // getProductDetails();

   function printData(list)
    {
     tbody.innerHTML = list.map((product,index)=>{
        return `<tr>
        <th > ${index + 1} </th>
        <td> ${product.productName}</td>
        <td>${product.qty} </td>
        <td> ${product.price}</td>
        <td><button  data-remove-id="${product._id}" class=" remove btn-danger btn-sm">Del</button>
        </td>
        </tr>`

      }) .join(" "); 

      AddRemoveButtonEvent();
    }

    function AddRemoveButtonEvent()
    {
        let removeBtn = document.querySelectorAll('.remove');
        removeBtn.forEach((button)=>{
            button.addEventListener("click",()=>{
                let {removeId}  = button.dataset; // dataset : to get a button id
                removeProduct(removeId);
            });
        });
    }

    async function removeProduct(id)
    {
        let url = `http://localhost:3040/api/remove-product/${id}`;
        let response = await fetch(url,{method:"DELETE"});
        let data = await response.json();
        if(data.status === true)
        {
            getProductDetails();
        }
        alert(data.message)
    }
    getProductDetails();



})

