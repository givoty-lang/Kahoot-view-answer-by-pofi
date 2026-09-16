(()=>{
    if(document.getElementById("hajoXaMenu"))return;

    const style=document.createElement("style");
    style.id="hajoXaStyle";
    style.textContent=`
        #hajoXaMenu{
            position:fixed;
            top:120px;
            left:120px;
            width:340px;
            background:#050505;
            border:1px solid #1c1c1c;
            border-radius:5px;
            color:#fff;
            font:12px Arial,sans-serif;
            z-index:2147483647;
            overflow:hidden;
            user-select:none;
            box-shadow:0 10px 35px #000b;
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

        #hajoXaStatus{
            margin-right:7px;
            color:#777;
            font-size:10px;
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
            gap:7px;
        }

        .hajoXaSection{
            border:1px solid #171717;
            background:#070707;
            border-radius:4px;
            overflow:hidden;
        }

        .hajoXaRow{
            min-height:34px;
            display:flex;
            align-items:center;
            padding:0 9px;
        }

        .hajoXaLabel{
            flex:1;
            color:#ccc;
        }

        .hajoXaValue{
            color:#777;
            font-size:11px;
            max-width:190px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }

        #hajoXaLog{
            height:160px;
            padding:8px;
            overflow:auto;
            background:#030303;
            color:#777;
            font:10px Consolas,monospace;
            white-space:pre-wrap;
            user-select:text;
        }

        .hajoXaButton{
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

        .hajoXaButton:hover{
            background:#0d0d0d;
            color:#fff;
            border-color:#252525;
        }

        .hajoXaDot{
            width:6px;
            height:6px;
            border-radius:50%;
            background:#444;
            margin-right:7px;
        }

        .hajoXaDot.active{
            background:#fff;
            box-shadow:0 0 7px #fff6;
        }

        .hajoXaFooter{
            padding:7px 9px;
            color:#444;
            font-size:10px;
            text-align:center;
            border-top:1px solid #151515;
        }
    `;

    document.head.appendChild(style);

    const menu=document.createElement("div");
    menu.id="hajoXaMenu";

    menu.innerHTML=`
        <div id="hajoXaHeader">
            <div id="hajoXaTitle">HajoXa</div>
            <div id="hajoXaStatus">READY</div>
            <div id="hajoXaBtns">
                <button id="hajoXaMin">−</button>
                <button id="hajoXaClose">×</button>
            </div>
        </div>

        <div id="hajoXaBody">
            <div class="hajoXaSection">
                <div class="hajoXaRow">
                    <div class="hajoXaDot active" id="hajoXaDot"></div>
                    <div class="hajoXaLabel">GitHub Fetch</div>
                    <div class="hajoXaValue" id="hajoXaFetchState">Ready</div>
                </div>

                <div class="hajoXaRow">
                    <div class="hajoXaLabel">HTTP Status</div>
                    <div class="hajoXaValue" id="hajoXaHttp">None</div>
                </div>

                <div class="hajoXaRow">
                    <div class="hajoXaLabel">Downloaded</div>
                    <div class="hajoXaValue" id="hajoXaSize">0 bytes</div>
                </div>
            </div>

            <div class="hajoXaSection">
                <div id="hajoXaLog"></div>
            </div>

            <button class="hajoXaButton" id="hajoXaFetch">Fetch HajoXa.js</button>
            <button class="hajoXaButton" id="hajoXaClear">Clear Log</button>
        </div>

        <div class="hajoXaFooter">HajoXa • Debug Loader</div>
    `;

    document.body.appendChild(menu);

    const header=menu.querySelector("#hajoXaHeader");
    const body=menu.querySelector("#hajoXaBody");
    const minButton=menu.querySelector("#hajoXaMin");
    const closeButton=menu.querySelector("#hajoXaClose");
    const fetchButton=menu.querySelector("#hajoXaFetch");
    const clearButton=menu.querySelector("#hajoXaClear");
    const logBox=menu.querySelector("#hajoXaLog");
    const status=menu.querySelector("#hajoXaStatus");
    const fetchState=menu.querySelector("#hajoXaFetchState");
    const http=menu.querySelector("#hajoXaHttp");
    const size=menu.querySelector("#hajoXaSize");
    const dot=menu.querySelector("#hajoXaDot");

    let dragging=false;
    let offsetX=0;
    let offsetY=0;

    const url="https://raw.githubusercontent.com/givoty-lang/Kahoot-view-answer-by-pofi/main/HajoXa.js?t="+Date.now();

    const log=(text,type="info")=>{
        const time=new Date().toLocaleTimeString();
        const line=document.createElement("div");
        line.textContent=`[${time}] ${text}`;
        line.style.color=type==="error"?"#ff5555":type==="warn"?"#aaa":"#777";
        logBox.appendChild(line);
        logBox.scrollTop=logBox.scrollHeight;
        console.log("[HajoXa]",text);
    };

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
        const hidden=body.style.display==="none";
        body.style.display=hidden?"flex":"none";
        minButton.textContent=hidden?"−":"+";
    });

    closeButton.addEventListener("click",()=>{
        menu.remove();
        style.remove();
    });

    clearButton.addEventListener("click",()=>{
        logBox.innerHTML="";
        log("Log cleared");
    });

    fetchButton.addEventListener("click",async()=>{
        status.textContent="FETCHING";
        fetchState.textContent="Fetching...";
        http.textContent="...";
        size.textContent="0 bytes";
        dot.classList.add("active");

        log("Starting fetch...");
        log("URL: "+url);

        try{
            const response=await fetch(url,{
                cache:"no-store"
            });

            http.textContent=String(response.status);
            log("HTTP status: "+response.status);
            log("Response OK: "+response.ok);
            log("Content-Type: "+(response.headers.get("content-type")||"unknown"));

            if(!response.ok){
                throw new Error("HTTP "+response.status);
            }

            const code=await response.text();

            size.textContent=code.length.toLocaleString()+" bytes";
            fetchState.textContent="Downloaded";
            status.textContent="SUCCESS";

            log("Downloaded "+code.length.toLocaleString()+" characters");
            log("First 200 characters:");
            log(code.slice(0,200).replace(/\s+/g," "));

            try{
                new Function(code);
                log("Syntax check: OK");
            }catch(err){
                log("Syntax check failed: "+err.message,"error");
                status.textContent="SYNTAX ERROR";
                fetchState.textContent="Invalid JS";
                return;
            }

            log("Fetch and syntax checks completed.");
            log("The downloaded code was NOT executed.");

        }catch(err){
            status.textContent="ERROR";
            fetchState.textContent="Failed";
            dot.classList.remove("active");
            log("Fetch error: "+err.message,"error");
            console.error("[HajoXa] Fetch error:",err);
        }
    });

    log("HajoXa UI loaded");
    log("Ready to fetch GitHub script");
})();
