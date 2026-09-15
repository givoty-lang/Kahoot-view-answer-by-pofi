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
            background:#050505;
            border:1px solid #1c1c1c;
            border-radius:5px;
            color:#fff;
            font:12px Arial,sans-serif;
            z-index:2147483647;
            overflow:hidden;
            user-select:none;
        }

        #hajoXaHeader{
            height:34px;
            display:flex;
            align-items:center;
            padding:0 8px;
            background:#070707;
            border-bottom:1px solid #181818;
            cursor:move;
        }

        #hajoXaTitle{
            flex:1;
            font-weight:600;
            color:#ddd;
        }

        #hajoXaBtns{
            display:flex;
            gap:3px;
        }

        #hajoXaBtns button{
            width:22px;
            height:22px;
            padding:0;
            border:1px solid #1b1b1b;
            border-radius:3px;
            background:#090909;
            color:#888;
            font-size:14px;
            line-height:20px;
            cursor:pointer;
        }

        #hajoXaBtns button:hover{
            background:#101010;
            color:#fff;
        }

        #hajoXaBody{
            padding:9px;
            display:flex;
            flex-direction:column;
            gap:6px;
        }

        #hajoXaBody button{
            width:100%;
            height:28px;
            padding:0 8px;
            text-align:left;
            background:#080808;
            color:#ccc;
            border:1px solid #1b1b1b;
            border-radius:3px;
            cursor:pointer;
        }

        #hajoXaBody button:hover{
            background:#0d0d0d;
            color:#fff;
            border-color:#252525;
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

        <div id="hajoXaBody">
            <button id="testButton">Test Button</button>
            <button id="anotherButton">Another Button</button>
        </div>
    `;

    document.body.appendChild(menu);

    const header=menu.querySelector("#hajoXaHeader");
    const body=menu.querySelector("#hajoXaBody");
    const minButton=menu.querySelector("#hajoXaMin");
    const closeButton=menu.querySelector("#hajoXaClose");

    let dragging=false;
    let offsetX=0;
    let offsetY=0;

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
        body.style.display=body.style.display==="none"?"flex":"none";
    });

    closeButton.addEventListener("click",()=>{
        menu.remove();
        style.remove();
    });

    menu.querySelector("#testButton").addEventListener("click",()=>{
        console.log("HajoXa works");
    });

    menu.querySelector("#anotherButton").addEventListener("click",()=>{
        console.log("Another button");
    });
})();
