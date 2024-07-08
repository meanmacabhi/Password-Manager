//deletepass function delete the perticular row
const deletepass=(username)=>{//it takes argumrnt as username or id
    let data = localStorage.getItem("passwords");//it fetches the data
    let arr = JSON.parse(data);//it parses the data
    let arrnew = arr.filter((e)=>{//this filter function filters the userid from the rest of the userids
        return e.username != username;//all other except the specified usernsme moves to the newarr
        
    })
    localStorage.setItem("passwords",JSON.stringify(arrnew));//then newarr is converted to json format
    alert(`password of ${username} deleted succsessfully`);//displays the deleted userid 
    show();

}















//show function displayss the overall changes made 

const show=()=>{
 tb = document.querySelector("table")//table is selected
let data = localStorage.getItem("passwords");//data stored is fetched which is in the json format 
if(data ==null || JSON.parse(data).length ==0){//checks if data is not present 
    tb.innerHTML = "NO DATA";//then display no data
}
else{   //if data present the innerhtml of the table is 1st row becomes the headings
    tb.innerHTML =  `<tr>
    <th>WEBSITE</th>
    <th>USERNAME</th>
    <th>PASSWORD</th>
    <th>DELETE</th>
    </tr>`
    let arr = JSON.parse(data);//the the data is parsed and stored in arr
    let str="";//an empty string str is taken
    for(let index =0;index<arr.length;index++){//a for loop iterates through every index of arr 
        const element  = arr[index];//and values of every index is stored in an element
        let maskedPassword = '*'.repeat(element.password.length);//now the password of the element is displayed as * for security purposes  
       //now the empty string str is updated wiyth values of each element
        str +=`<tr>
        <td>${element.website}</td>
        <td>${element.username}</td>
        <td>${maskedPassword}</td>
        <td><button class="btn" onclick="deletepass('${element.username}')">Delete</button></td>
        <td><button class="copy-btn" onclick="copyPassword('${element.password}')">Copy</button></td>
        </tr>`
        // the button with class btn is delete button which will onclick call the deletepass func with arguments as username of element 
        //the button with class copy-btn is copy button which on click will copy the password of that perticular element
    }
 
    tb.innerHTML = tb.innerHTML+str;//the innerhtml of table is updated
}
website.value ="";//the values inside the form is updated to null ..which means that the form resets
username.value ="";
password.value ="";


}

//this is the copy function
const copyPassword = (password) => {//it takes argument as the password that needs to be copied
    navigator.clipboard.writeText(password)//this copied the password in clipboard
        .then(() => {//if succsessfully copied 
            alert("Password copied to clipboard");
        })
        .catch((error) => {//if some error occurs 
            console.error('Failed to copy password: ', error);
        });


}









//main part of the logic
show();//first the show function is called
document.querySelector(".btn").addEventListener("click",(e)=>{//this is the submit button an eventlistener is added 
    e.preventDefault();//this prevents default submission of the form
    let passwords = localStorage.getItem("passwords");//passwords are fetched from local stoage and put in a varibale passwords
    //console.log(passwords);
    if(passwords==null){//if there are no passwords 
        let json = [];//it creates a json array
        json.push({website:website.value,username:username.value , password:password.value})//the it pushes the values from the form inside the json array
        alert("passsword saved");//and gives a alert password saved
        localStorage.setItem("passwords",JSON.stringify(json));//then it converts the json array in JSON format inside the local storage
    }
    else{//if not empty
        let json = JSON.parse(localStorage.getItem("passwords"));//does the same thing as before just no need to create a new json array
        json.push({website:website.value,username:username.value , password:password.value})
        alert("passsword saved");
        localStorage.setItem("passwords",JSON.stringify(json));

    }
    show();//after everything is done it calls the show function again so that we dont have to reloed the page to see the changes
})



