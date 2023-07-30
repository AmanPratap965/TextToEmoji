let clutter="";
// localStorage.clear();
function btnClicking(){
    document.querySelector("button").addEventListener("click",function(){
        
        document.querySelector("#result").style.display="block";
    });


    document.querySelector("#dec-btn").addEventListener("click",function(){
        document.querySelector("#decryption").style.display="block";
        document.querySelector("#encryption").style.display="none";
        document.querySelector("#dec-btn").style.backgroundColor="#444";
        document.querySelector("#enc-btn").style.backgroundColor="#222";
        document.querySelector("#main>h1>span>img").style.rotate="180deg";
        document.querySelector("#result").style.display = "none"
       
    });


    document.querySelector("#enc-btn").addEventListener("click",function(){
        document.querySelector("#decryption").style.display="none";
        document.querySelector("#encryption").style.display="block";
        document.querySelector("#dec-btn").style.backgroundColor="#222";
        document.querySelector("#enc-btn").style.backgroundColor="#444";
        document.querySelector("#main>h1>span>img").style.rotate="0deg";
        document.querySelector("#result").style.display = "none"
        
    });


    
}
btnClicking();

function encryption(){
    document.querySelector("#encrypt-btn").addEventListener('click',function(){
        //Getting input
        let input=document.getElementById("txtmsg").value;
        //getting password
        let password=document.getElementById("password").value; 
        
        //converting it to set of emojis
        const str=input.split("");
        console.log(str)
        
        
        str.forEach(element =>{
            clutter+=`&#128${(element.charCodeAt())} `;
        });
        
        document.querySelector("#result").innerHTML=clutter;

        //creating array of object 
        let dataArr=[];
   
        if(JSON.parse(localStorage.getItem('data1'))){
            //To fetch the old data with it
            dataArr=JSON.parse(localStorage.getItem("data1"));
            //adding the data to it
            dataArr.push({"pass":password, "input":input, "clutter":clutter});
        }else{
            dataArr=[{
            "pass":password,
                "input":input,
                "clutter":clutter
            }];

        }
        localStorage.setItem("data1",JSON.stringify(dataArr));
    });
    
}
encryption();

function decryption(){
    document.querySelector("#decrypt-btn").addEventListener("click",function(){
        let clutter2="";
        let input2=document.querySelector("#emojimsg").value;
        let finalpassword=document.querySelector("#finalpassword").value;

            //array of objects stored in local storage
        let user=JSON.parse(localStorage.getItem('data1'));
        

        //Converting emoji to ASCII code of Characters/words
       
        let str2=input2.split(" ");
        str2.forEach(element=>{
            clutter2 += `&#${(element.codePointAt(0))} `
        });
        

        //Finding word from the database

        let found;
        user.forEach(i=>{
            if(i.clutter==clutter2){
                found=i;
                // console.log(i);
            }
       })
        
        if(found.clutter===clutter2 && found.pass===finalpassword){
            document.querySelector("#result").innerHTML=found.input;
            document.querySelector("#result").style.display="block";
            document.querySelector("#result").style.color="#eee";
        }else if(found.clutter===clutter2 && found.pass!=finalpassword){
            document.querySelector("#result").style.display = `block`
            document.querySelector("#result").style.color = `red`
            document.querySelector("#result").innerHTML = "Wrong password!"
        }
        
        
    })
}
decryption();

