(()=>{
    if(document.getElementById("hajoXaMenu"))return;

    const style=document.createElement("style");
    style.id="hajoXaStyle";
    style.textContent=`
        #hajoXaMenu{
            position:fixed;
            top:120px;
            left:120px;
            width:300px;
            background:rgb(35,35,35);
            border-radius:5px;
            color:#fff;
            font:12px Arial,sans-serif;
            z-index:2147483647;
            overflow:hidden;
            user-select:none;
            opacity:0;
            transform:scale(.97);
            transition:opacity .18s ease,transform .18s ease;
        }

        #hajoXaMenu.hajoXaShow{
            opacity:1;
            transform:scale(1);
        }

        #hajoXaHeader{
            height:36px;
            display:flex;
            align-items:center;
            padding:0 9px;
            background:rgb(35,35,35);
            cursor:move;
        }

        #hajoXaTitle{
            flex:1;
            font-weight:600;
            color:#e8e8e8;
        }

        #hajoXaBtns{
            display:flex;
            gap:3px;
        }

        #hajoXaBtns button{
            width:23px;
            height:23px;
            padding:0;
            border:0;
            border-radius:4px;
            background:rgb(43,43,43);
            color:#999;
            font-size:14px;
            cursor:pointer;
            transition:background .12s ease,color .12s ease,transform .12s ease;
        }

        #hajoXaBtns button:hover{
            background:rgb(50,50,50);
            color:#fff;
        }

        #hajoXaBtns button:active{
            transform:scale(.92);
        }

        #hajoXaBody{
            height:110px;
            padding:9px;
            box-sizing:border-box;
            background:rgb(35,35,35);
            transition:height .2s ease,opacity .15s ease,padding .2s ease;
        }

        #hajoXaMenu.hajoXaMinimized #hajoXaBody{
            height:0;
            padding-top:0;
            padding-bottom:0;
            opacity:0;
            pointer-events:none;
        }

        .hajoXaRow{
            height:34px;
            display:flex;
            align-items:center;
            padding:0 8px;
            border-radius:4px;
            background:rgb(40,40,40);
        }

        .hajoXaLabel{
            flex:1;
            color:#ddd;
        }

        .hajoXaToggle{
            width:34px;
            height:18px;
            position:relative;
            border-radius:10px;
            background:rgb(52,52,52);
            cursor:pointer;
            transition:background .15s ease;
        }

        .hajoXaToggle span{
            position:absolute;
            top:3px;
            left:3px;
            width:12px;
            height:12px;
            border-radius:50%;
            background:#888;
            transition:left .15s ease,background .15s ease;
        }

        .hajoXaToggle.on{
            background:rgb(70,70,70);
        }

        .hajoXaToggle.on span{
            left:19px;
            background:#fff;
        }

        #hajoXaFocusLayer{
            position:fixed;
            inset:0;
            z-index:2147483646;
            pointer-events:none;
            background:rgba(0,0,0,0);
            transition:background .25s ease;
        }

        body.hajoXaFocus #hajoXaFocusLayer{
            background:rgba(0,0,0,.16);
        }

        body.hajoXaFocus > *:not(#hajoXaFocusLayer):not(#hajoXaMenu){
            filter:brightness(.88) saturate(.88);
            transition:filter .25s ease;
        }
    `;

    document.head.appendChild(style);

    const layer=document.createElement("div");
    layer.id="hajoXaFocusLayer";
    document.body.appendChild(layer);

    const menu=document.createElement("div");
    menu.id="hajoXaMenu";

    menu.innerHTML=`
        <div id="hajoXaHeader">
            <div id="hajoXaTitle">HajoXa</div>
            <div id="hajoXaBtns">
                <button id="hajoXaMin">−</button>
                <button id="hajoXaClose">×</button>
            </div>
        </div>

        <div id="hajoXaBody">
            <div class="hajoXaRow">
                <div class="hajoXaLabel">Focus Mode</div>
                <div class="hajoXaToggle" id="hajoXaToggle">
                    <span></span>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(menu);

    requestAnimationFrame(()=>{
        menu.classList.add("hajoXaShow");
    });

    const header=menu.querySelector("#hajoXaHeader");
    const minButton=menu.querySelector("#hajoXaMin");
    const closeButton=menu.querySelector("#hajoXaClose");
    const toggle=menu.querySelector("#hajoXaToggle");

    let dragging=false;
    let offsetX=0;
    let offsetY=0;
    let minimized=false;
    let focusMode=false;

    header.addEventListener("mousedown",e=>{
        if(e.target.closest("button"))return;

        dragging=true;
        offsetX=e.clientX-menu.offsetLeft;
        offsetY=e.clientY-menu.offsetTop;
    });

    document.addEventListener("mousemove",e=>{
        if(!dragging)return;

        menu.style.left=Math.max(0,e.clientX-offsetX)+"px";
        menu.style.top=Math.max(0,e.clientY-offsetY)+"px";
    });

    document.addEventListener("mouseup",()=>{
        dragging=false;
    });

    minButton.addEventListener("click",()=>{
        minimized=!minimized;
        menu.classList.toggle("hajoXaMinimized",minimized);
        minButton.textContent=minimized?"+":"−";
    });

    toggle.addEventListener("click",()=>{
        focusMode=!focusMode;
        toggle.classList.toggle("on",focusMode);
        document.body.classList.toggle("hajoXaFocus",focusMode);
    });

    closeButton.addEventListener("click",()=>{
        document.body.classList.remove("hajoXaFocus");
        menu.classList.remove("hajoXaShow");

        setTimeout(()=>{
            menu.remove();
            layer.remove();
            style.remove();
        },180);
    });
})();
