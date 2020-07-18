console.warn('PostMaster (Postman Clone)');

let paramCount = 1;

function elemForString(html){
    let div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
}

let paramBox = document.getElementById('paramBox');
paramBox.style.display = 'none';

let paramRadio = document.getElementById('custom');
paramRadio.addEventListener('click',()=>{
    document.getElementById('reqJsonBox').style.display = 'none';
    paramBox.style.display = 'block';
});

let jsonRadio = document.getElementById('json');
jsonRadio.addEventListener('click',()=>{
    paramBox.style.display = 'none';
    document.getElementById('reqJsonBox').style.display = 'block';
});

let addParam = document.getElementById('addParam');
addParam.addEventListener('click',()=>{
    let html = `<div class="form-row my-2">
                    <label for="paramKey${paramCount+1}" class="col-sm-2 col-form-label">New Parameter : </label>
                    <div class="col">
                        <input type="text" class="form-control" id="paramKey${paramCount+1}" placeholder="New Parameter Key">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" id="paramValue${paramCount+1}" placeholder="New Parameter Value">
                    </div>
                    <button class="btn btn-danger delParam" style="padding-left:14px;padding-right:14px;">-</button>
                    </div>`;
    let paramElement = elemForString(html);
    paramCount++;
    paramBox.appendChild(paramElement);

    let delParam = document.getElementsByClassName('delParam');
    for(item of delParam){
        item.addEventListener('click', (e)=>{
            e.target.parentElement.remove();
        })
    }
});

let submit = document.getElementById('fetch');
submit.addEventListener('click', ()=>{
    document.getElementById('response').innerHTML = `Please wait....Fetching response`;
    Prism.highlightAll(); 
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='reqType']:checked").value;
    let contentType = document.querySelector("input[name='cType']:checked").value;

    let data = {};
    if(contentType == 'params'){
        for(i=0;i<paramCount+1;i++){
            if(document.getElementById('paramKey'+(i+1)) != undefined){
                let key = document.getElementById('paramKey'+(i+1)).value;
                let value = document.getElementById('paramValue'+(i+1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
        console.log(data);
    }
    else{
        data = document.getElementById('jsonBox').value;
    }

    if(requestType == 'POST'){
        fetch(url,{
            method:'POST',
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: data
        }).then(response => response.text())
        .then(text =>{
            document.getElementById('response').innerHTML = text; 
            Prism.highlightAll(); 
        });
    }
    else if(requestType == 'GET'){
        fetch(url,{
            method:'GET'
        }).then(response => response.text())
        .then(text =>{
            document.getElementById('response').innerHTML = text;
            Prism.highlightAll(); 
        });
    }
});