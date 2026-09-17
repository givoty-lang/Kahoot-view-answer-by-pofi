(()=>{
    if(document.getElementById("hajoXaMenu"))return;

    const style=document.createElement("style");
    style.id="hajoXaStyle";
    style.textContent=`
        #hajoXaMenu{
            position:fixed;
            top:120px;
            left:120px;
            width:360px;
            min-height:210px;
            background:rgb(25,25,25);
            border:1px solid rgb(45,45,45);
            border-radius:6px;
            color:#fff;
            font:13px Arial,sans-serif;
            z-index:2147483647;
            overflow:hidden;
            user-select:none;
            box-shadow:0 12px 35px rgba(0,0,0,.45);
            opacity:0;
            transform:scale(.96);
            transition:opacity .18s ease,transform .18s ease,min-height .2s ease;
        }

        #hajoXaMenu.hajoXaShow{
            opacity:1;
            transform:scale(1);
        }

        #hajoXaMenu.hajoXaMinimized{
            min-height:0;
        }

        #hajoXaHeader{
            height:40px;
            display:flex;
            align-items:center;
            padding:0 10px;
            background:rgb(29,29,29);
            border-bottom:1px solid rgb(42,42,42);
            cursor:move;
            box-sizing:border-box;
        }

        #hajoXaTitle{
            flex:1;
            font-weight:600;
            color:#e5e5e5;
            letter-spacing:.15px;
        }

        #hajoXaBtns{
            display:flex;
            gap:4px;
        }

        #hajoXaBtns button{
            width:25px;
            height:25px;
            padding:0;
            border:1px solid rgb(48,48,48);
            border-radius:4px;
            background:rgb(32,32,32);
            color:#999;
            font-size:15px;
            line-height:22px;
            cursor:pointer;
            transition:background .12s ease,color .12s ease,border-color .12s ease,transform .12s ease;
        }

        #hajoXaBtns button:hover{
            background:rgb(40,40,40);
            color:#fff;
            border-color:rgb(60,60,60);
        }

        #hajoXaBtns button:active{
            transform:scale(.92);
        }

        #hajoXaBody{
            height:170px;
            background:rgb(25,25,25);
            transition:height .2s ease,opacity .15s ease;
        }

        #hajoXaMenu.hajoXaMinimized #hajoXaBody{
            height:0;
            opacity:0;
        }
    `;

    document.head.appendChild(style);

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

        <div id="hajoXaBody"></div>
    `;

    document.body.appendChild(menu);

    requestAnimationFrame(()=>{
        menu.classList.add("hajoXaShow");
    });

    const header=menu.querySelector("#hajoXaHeader");
    const minButton=menu.querySelector("#hajoXaMin");
    const closeButton=menu.querySelector("#hajoXaClose");

    let dragging=false;
    let offsetX=0;
    let offsetY=0;
    let minimized=false;

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

    closeButton.addEventListener("click",()=>{
        menu.classList.remove("hajoXaShow");

        setTimeout(()=>{
            menu.remove();
            style.remove();
        },180);
    });
})();
