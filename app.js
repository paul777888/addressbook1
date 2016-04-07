var data = [];
var getOutputBoxById = document.getElementById('output');
var formData = document.getElementById('form');
var addButton = document.getElementById('add');

addButton.addEventListener('click',addItem);

//Event Delegation
document.querySelector('body').addEventListener('click',function(e){
        if(e.target.tagName.toLowerCase()==='p'){
            //Clear previous highlight class
            var elems = document.querySelectorAll('.highlight');
            [].forEach.call(elems,function(el){
                el.classList.remove('highlight');
            })
            //Set to highlight 
            e.target.setAttribute('class','highlight');
        } 
});

function addItem(){
    var temp=[];
    for (var i=0;i<formData.length;i++){
        var conElement = formData.elements[i].value.trim();
        temp.push(conElement);
        formData.elements[i].value='';
    };
    data.push(temp);
    getOutputBoxById.innerHTML='';
    getOutputBoxById.appendChild(displayItem(data));
}

function removeItem(){
    var elem = document.querySelector('.highlight');
    console.log(elem.parentNode);
    if(elem){
        elem.parentNode.removeChild(elem);
    }
}

function displayItem(a){
    //create the list element
    var list = document.createElement('ul');
    
    function logArrayElements(element,index,array){
        //create the list item
        var liElement = document.createElement('li');
        var pElement = document.createElement('p');
        //set contents
        pElement.appendChild(document.createTextNode(element));
        //add it to the LI
        liElement.appendChild(pElement);        
        //add it to UL
        list.appendChild(liElement);
    }
    a.forEach (logArrayElements);
    return list;
}


sortByFirstName=function (){
    data.sort(function(a,b){
                return a[0]>b[0];
            });
    getOutputBoxById.innerHTML='';
    getOutputBoxById.appendChild(displayItem(data));
    
}

var sortByLastName=function(){
    data.sort(function(a,b){
                return a[1]>b[1];
                });
    getOutputBoxById.innerHTML='';
    getOutputBoxById.appendChild(displayItem(data));
}




