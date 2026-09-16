
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
            box-shadow:0 10px 35px #000b;
            transition:opacity .15s,transform .15s;
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
            letter-spacing:.2px;
        }

        #hajoXaStatus{
            margin-right:7px;
            color:#666;
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
            color:#666;
            font-size:11px;
            max-width:150px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }

        .hajoXaToggle{
            width:34px;
            height:18px;
            position:relative;
            background:#111;
            border:1px solid #222;
            border-radius:10px;
            cursor:pointer;
            transition:.15s;
        }

        .hajoXaToggle span{
            position:absolute;
            top:3px;
            left:3px;
            width:10px;
            height:10px;
            border-radius:50%;
            background:#555;
            transition:.15s;
        }

        .hajoXaToggle.on{
            background:#181818;
            border-color:#333;
        }

        .hajoXaToggle.on span{
            left:19px;
            background:#fff;
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
            transition:.12s;
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

        .hajoXaAnswer{
            color:#fff;
            font-weight:600;
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
                    <div class="hajoXaLabel">Auto Answer</div>
                    <div class="hajoXaToggle on" id="hajoXaAuto"><span></span></div>
                </div>

                <div class="hajoXaRow">
                    <div class="hajoXaLabel">Highlight Correct</div>
                    <div class="hajoXaToggle on" id="hajoXaHighlight"><span></span></div>
                </div>
            </div>

            <div class="hajoXaSection">
                <div class="hajoXaRow">
                    <div class="hajoXaDot active" id="hajoXaDot"></div>
                    <div class="hajoXaLabel">Status</div>
                    <div class="hajoXaValue" id="hajoXaState">Waiting...</div>
                </div>

                <div class="hajoXaRow">
                    <div class="hajoXaLabel">Correct Answer</div>
                    <div class="hajoXaValue hajoXaAnswer" id="hajoXaAnswer">None</div>
                </div>
            </div>

            <button class="hajoXaButton" id="hajoXaTest">Test Detection</button>
            <button class="hajoXaButton" id="hajoXaClear">Clear Highlight</button>
        </div>

        <div class="hajoXaFooter">HajoXa • Clone Tools</div>
    `;

    document.body.appendChild(menu);

    const header=menu.querySelector("#hajoXaHeader");
    const body=menu.querySelector("#hajoXaBody");
    const minButton=menu.querySelector("#hajoXaMin");
    const closeButton=menu.querySelector("#hajoXaClose");
    const autoToggle=menu.querySelector("#hajoXaAuto");
    const highlightToggle=menu.querySelector("#hajoXaHighlight");
    const status=menu.querySelector("#hajoXaStatus");
    const state=menu.querySelector("#hajoXaState");
    const answer=menu.querySelector("#hajoXaAnswer");
    const dot=menu.querySelector("#hajoXaDot");

    let dragging=false;
    let offsetX=0;
    let offsetY=0;
    let autoAnswer=true;
    let highlight=true;

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
        menu.style.width=hidden?"300px":"300px";
        minButton.textContent=hidden?"−":"+";
    });

    closeButton.addEventListener("click",()=>{
        menu.remove();
        style.remove();
    });

    autoToggle.addEventListener("click",()=>{
        autoAnswer=!autoAnswer;
        autoToggle.classList.toggle("on",autoAnswer);
        status.textContent=autoAnswer?"READY":"OFF";
        state.textContent=autoAnswer?"Waiting...":"Disabled";
        dot.classList.toggle("active",autoAnswer);
    });

    highlightToggle.addEventListener("click",()=>{
        highlight=!highlight;
        highlightToggle.classList.toggle("on",highlight);

        if(!highlight){
            document.querySelectorAll(".hajoXaCorrect").forEach(el=>{
                el.classList.remove("hajoXaCorrect");
            });
        }
    });

    function findCorrectAnswer(){
        const selectors=[
            '[data-correct="true"]',
            '[data-is-correct="true"]',
            '[data-answer-correct="true"]',
            '.correct',
            '.is-correct'
        ];

        for(const selector of selectors){
            const el=document.querySelector(selector);
            if(el)return el;
        }

        return null;
    }

    function processAnswer(){
        const correct=findCorrectAnswer();

        if(!correct){
            status.textContent=autoAnswer?"WAITING":"OFF";
            state.textContent="Waiting...";
            answer.textContent="None";
            dot.classList.toggle("active",autoAnswer);
            return;
        }

        const target=correct.closest(
            'button,[role="button"],.answer,.option,[data-answer]'
        )||correct;

        status.textContent="FOUND";
        state.textContent="Correct answer found";
        answer.textContent=(target.innerText||"Correct").trim();

        if(highlight){
            document.querySelectorAll(".hajoXaCorrect").forEach(el=>{
                el.classList.remove("hajoXaCorrect");
            });

            target.classList.add("hajoXaCorrect");

            if(!document.getElementById("hajoXaHighlightStyle")){
                const s=document.createElement("style");
                s.id="hajoXaHighlightStyle";
                s.textContent=`
                    .hajoXaCorrect{
                        outline:2px solid #fff!important;
                        box-shadow:0 0 14px #fff4!important;
                        filter:brightness(1.25)!important;
                    }
                `;
                document.head.appendChild(s);
            }
        }

        if(autoAnswer){
            setTimeout(()=>{
                target.click();
                status.textContent="ANSWERED";
                state.textContent="Answer selected";
            },120);
        }
    }

    menu.querySelector("#hajoXaTest").addEventListener("click",()=>{
        processAnswer();
    });

    menu.querySelector("#hajoXaClear").addEventListener("click",()=>{
        document.querySelectorAll(".hajoXaCorrect").forEach(el=>{
            el.classList.remove("hajoXaCorrect");
        });

        answer.textContent="None";
        state.textContent="Highlight cleared";
        status.textContent=autoAnswer?"READY":"OFF";
    });

    const observer=new MutationObserver(()=>{
        if(autoAnswer||highlight)processAnswer();
    });

    observer.observe(document.body,{
        childList:true,
        subtree:true,
        attributes:true
    });

    processAnswer();
})();
