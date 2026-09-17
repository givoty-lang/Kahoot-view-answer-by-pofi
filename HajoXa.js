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
            height:38px;
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
            transition:.12s;
        }

        #hajoXaBtns button:hover{
            background:rgb(50,50,50);
            color:#fff;
        }

        #hajoXaBody{
            height:175px;
            padding:10px;
            box-sizing:border-box;
            background:rgb(35,35,35);
            transition:height .2s ease,opacity .16s ease,padding .2s ease;
        }

        #hajoXaMenu.hajoXaMinimized #hajoXaBody{
            height:0;
            padding-top:0;
            padding-bottom:0;
            opacity:0;
            pointer-events:none;
        }

        .hajoXaPanel{
            height:100%;
            background:rgb(40,40,40);
            border-radius:4px;
            padding:12px;
            box-sizing:border-box;
        }

        .hajoXaName{
            color:#eee;
            font-weight:600;
            margin-bottom:5px;
        }

        .hajoXaDescription{
            color:#888;
            line-height:16px;
            margin-bottom:18px;
        }

        .hajoXaRow{
            height:38px;
            display:flex;
            align-items:center;
            padding:0 9px;
            border-radius:4px;
            background:rgb(45,45,45);
            box-sizing:border-box;
        }

        .hajoXaLabel{
            flex:1;
            color:#ddd;
        }

        .hajoXaState{
            color:#777;
            font-size:10px;
            margin-right:8px;
        }

        .hajoXaToggle{
            width:36px;
            height:19px;
            background:rgb(58,58,58);
            border-radius:10px;
            position:relative;
            cursor:pointer;
            transition:.16s;
        }

        .hajoXaToggle span{
            position:absolute;
            top:3px;
            left:3px;
            width:13px;
            height:13px;
            border-radius:50%;
            background:#888;
            transition:.16s;
        }

        .hajoXaToggle.on{
            background:rgb(75,75,75);
        }

        .hajoXaToggle.on span{
            left:20px;
            background:#fff;
        }

        #hajoXaCreativeLayer{
            position:fixed;
            inset:0;
            z-index:2147483640;
            pointer-events:none;
            overflow:hidden;
            opacity:0;
            transition:opacity .35s ease;
        }

        #hajoXaCreativeLayer.on{
            opacity:1;
        }

        #hajoXaGrid{
            position:absolute;
            inset:-30%;
            background-image:
                linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),
                linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);
            background-size:46px 46px;
            transform:perspective(500px) rotateX(58deg) scale(1.5);
            transform-origin:center;
            animation:hajoXaGridMove 10s linear infinite;
            opacity:.45;
        }

        #hajoXaVignette{
            position:absolute;
            inset:0;
            background:radial-gradient(circle at var(--hx,50%) var(--hy,50%),rgba(255,255,255,.11),rgba(0,0,0,.08) 12%,rgba(0,0,0,.42) 70%);
            transition:background-position .05s linear;
        }

        #hajoXaScan{
            position:absolute;
            inset:0;
            background:repeating-linear-gradient(
                to bottom,
                transparent 0,
                transparent 5px,
                rgba(255,255,255,.018) 6px,
                transparent 7px
            );
            opacity:.35;
        }

        #hajoXaParticles{
            position:absolute;
            inset:0;
        }

        .hajoXaParticle{
            position:absolute;
            width:2px;
            height:2px;
            border-radius:50%;
            background:rgba(255,255,255,.45);
            animation:hajoXaFloat linear infinite;
        }

        body.hajoXaCreativeActive > *:not(#hajoXaMenu):not(#hajoXaCreativeLayer){
            transition:transform .25s ease;
        }

        @keyframes hajoXaGridMove{
            from{transform:perspective(500px) rotateX(58deg) scale(1.5) translateY(0)}
            to{transform:perspective(500px) rotateX(58deg) scale(1.5) translateY(46px)}
        }

        @keyframes hajoXaFloat{
            from{transform:translate3d(0,20px,0);opacity:0}
            15%{opacity:.45}
            85%{opacity:.45}
            to{transform:translate3d(0,-140px,0);opacity:0}
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
            <div class="hajoXaPanel">
                <div class="hajoXaName">Live Lens</div>
                <div class="hajoXaDescription">
                    Turns the current website into an interactive animated scene.
                </div>

                <div class="hajoXaRow">
                    <div class="hajoXaLabel">Creative Mode</div>
                    <div class="hajoXaState" id="hajoXaState">OFF</div>
                    <div class="hajoXaToggle" id="hajoXaToggle">
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(menu);

    const creative=document.createElement("div");
    creative.id="hajoXaCreativeLayer";
    creative.innerHTML=`
        <div id="hajoXaGrid"></div>
        <div id="hajoXaVignette"></div>
        <div id="hajoXaScan"></div>
        <div id="hajoXaParticles"></div>
    `;
    document.body.appendChild(creative);

    const particles=creative.querySelector("#hajoXaParticles");

    for(let i=0;i<45;i++){
        const p=document.createElement("div");
        p.className="hajoXaParticle";
        p.style.left=Math.random()*100+"%";
        p.style.top=(70+Math.random()*40)+"%";
        p.style.animationDuration=(4+Math.random()*7)+"s";
        p.style.animationDelay=(-Math.random()*8)+"s";
        p.style.opacity=(.15+Math.random()*.35).toFixed(2);
        particles.appendChild(p);
    }

    requestAnimationFrame(()=>{
        menu.classList.add("hajoXaShow");
    });

    const header=menu.querySelector("#hajoXaHeader");
    const minButton=menu.querySelector("#hajoXaMin");
    const closeButton=menu.querySelector("#hajoXaClose");
    const toggle=menu.querySelector("#hajoXaToggle");
    const state=menu.querySelector("#hajoXaState");
    const vignette=creative.querySelector("#hajoXaVignette");

    let dragging=false;
    let offsetX=0;
    let offsetY=0;
    let minimized=false;
    let active=false;

    header.addEventListener("mousedown",e=>{
        if(e.target.closest("button"))return;
        dragging=true;
        offsetX=e.clientX-menu.offsetLeft;
        offsetY=e.clientY-menu.offsetTop;
    });

    document.addEventListener("mousemove",e=>{
        if(dragging){
            menu.style.left=Math.max(0,e.clientX-offsetX)+"px";
            menu.style.top=Math.max(0,e.clientY-offsetY)+"px";
        }

        if(active){
            const x=e.clientX/window.innerWidth*100;
            const y=e.clientY/window.innerHeight*100;

            creative.style.setProperty("--hx",x+"%");
            creative.style.setProperty("--hy",y+"%");

            vignette.style.setProperty("--hx",x+"%");
            vignette.style.setProperty("--hy",y+"%");
        }
    });

    document.addEventListener("mouseup",()=>{
        dragging=false;
    });

    toggle.addEventListener("click",()=>{
        active=!active;
        toggle.classList.toggle("on",active);
        creative.classList.toggle("on",active);
        document.body.classList.toggle("hajoXaCreativeActive",active);
        state.textContent=active?"ON":"OFF";

        if(!active){
            document.body.style.transform="";
        }
    });

    minButton.addEventListener("click",()=>{
        minimized=!minimized;
        menu.classList.toggle("hajoXaMinimized",minimized);
        minButton.textContent=minimized?"+":"−";
    });

    closeButton.addEventListener("click",()=>{
        document.body.classList.remove("hajoXaCreativeActive");
        creative.classList.remove("on");
        menu.classList.remove("hajoXaShow");

        setTimeout(()=>{
            menu.remove();
            creative.remove();
            style.remove();
        },180);
    });
})();
