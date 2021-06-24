var vClickArea          = document.getElementById("click_area");
var pontos              = 0;
var pontosAtual         = 0;
var pontosTotal         = 0;
var multiplicador       = 1;
var multMina            = 1;
var vrfy                = 0;
var minasIMG            = ['imgs/Caverna/Ferro.jpeg', 'imgs/Caverna/ouro.jpeg', 'imgs/Caverna/Diamante.jpeg', 'imgs/Caverna/Ametista.jpeg'];
var itensIMG            = ['imgs/picaretas/pPedra.png', 'imgs/picaretas/pFerro.png', 'imgs/picaretas/pOuro.png', 'imgs/picaretas/pTitanio.png', 'imgs/picaretas/pDiamante.png', 'imgs/picaretas/pRubi.png', 'imgs/picaretas/pEsmeralda.png', 'imgs/picaretas/pSafira.png', 'imgs/picaretas/pAmetista.png', 'imgs/picaretas/pOsmio.png', 'imgs/picaretas/pObsidian.png', 'imgs/picaretas/pJade.png', 'imgs/picaretas/pOpala.png', 'imgs/picaretas/pKarpatite.png', 'imgs/picaretas/pOpalaNegra.png'];
var picaretas           = ['pedra', 'ferro', 'ouro', 'titânio', 'diamante', 'rubi', 'esmeralda', 'safira', 'ametista', 'ósmio', 'obsidiana', 'jade'  , 'opala'  , 'karpetite', 'opala NEGRA'];
var pickPreços          = [1      , 1750   , 10000 , 27500    , 60000     , 175000, 327000     , 575000  , 1000000   , 2800000, 7629000    , 21763000, 100500000, 400000000  , 1000000000   ];
var pickId              = [1      , 1      , 1     , 1        , 1         , 1     , 1          , 1       , 1         , 1      , 1          , 1       , 1        , 1          , 1            ];
var Eficiencia          = [10     , 75     , 150   , 400      , 900       , 1650  , 2875       , 4000    , 7000      , 15258  , 43525      , 134000  , 400000   , 571428     , 1500000      ];
var minas               = ['ferro', 'ouro', 'diamante', 'ametista'];
var minasPreços         = [5000   , 100000, 1750000   , 50000000  ];
var minaRenda           = [10     , 100   , 150       , 500       ];
var minaId              = [1      , 1     , 1         , 1         ];


function clicked(){
    //armazenando pontos, uma pode ser subtraida, a outra não.
    pontosAtual     = pontosAtual + 1 * multiplicador * multMina;
    pontosTotal     = pontosTotal + 1 * multiplicador * multMina;
    //quantia de pontos por click.
    pontos          = 1 * multiplicador * multMina;

    //atualizando o texto do placar.
    document.getElementById("placar_de_pontos").innerHTML = "pontos:" + pontosAtual + "";
    
    //criando h1 e inserindo texto
    var pointtext = document.createElement("h1");
    pointtext.setAttribute("id","ponto");
    //colocando cordenadas aleatórias para o h1 ponto
    pointtext.style.left = "" +  Math.floor((Math.random() * 1150) + 15) + "px";
    pointtext.style.top  = "" + Math.floor((Math.random() * 600) + 20)+ "px";
    //chamando animação do css
    pointtext.style.animation = "number-rain 5s 1";
    pointtext.innerHTML = "+" + pontos;
    document.getElementById("click_area").appendChild(pointtext);
    //esperando para excluir o h1 de ponto
    setTimeout(() => {document.getElementById("click_area").removeChild(pointtext);}, 4000);
}

function open_shop() {
    //desabilitando o botão loja para o usuário não abrir mais de uma loja
    document.getElementById("btn_loja").disabled = true;
    //criando div da loja
    var shopDiv = document.createElement("div");
    document.getElementById("click_area").appendChild(shopDiv);
    shopDiv.setAttribute("id", "shop");
    //desabilitando o ganho de pontos
    document.getElementById("click_area").removeAttribute("onclick");

    //criando div onde itens aparecerão
    var itemList = document.createElement("div");
    shopDiv.appendChild(itemList);
    itemList.setAttribute("id", "itemList");
    //chamando animação de abrir a loja
    shopDiv.style.animation = "menu-drop 3s 1";

    var mineList = document.createElement("div");
    mineList.setAttribute("id", "mineShop");
    shopDiv.appendChild(mineList);


    //criando botão de fechar a loja
    var backButton = document.createElement("button");
    backButton.setAttribute("id", "btnBack");
    //desabilitando para evitar bugs
    backButton.disabled = true;
    //inserindo função onclick para fechar a loja
    backButton.onclick = function() {close_shop()};
    shopDiv.appendChild(backButton);


    //criando os itens de forma dinâmica
    for (var i = 0;i<picaretas.length;i++) {
        //criando quadro para inserir imagem e informações dos itens
        var itemFrame = document.createElement("div");
        itemFrame.setAttribute("id", "itemFrame");

        //inserindo imagem dos itens
        var itemImg = document.createElement("img");
        itemImg.setAttribute("id", "itemImg");
        itemImg.setAttribute("class", "itemImg" + i);
        itemImg.setAttribute("src", itensIMG[i]);

        var btnBuy = document.createElement("button");
        btnBuy.setAttribute("class", "btnBuy");
        btnBuy.setAttribute("id", "btnBuy" + i);
        
        if(pontosAtual < pickPreços[i]) {
            btnBuy.disabled = true;
        }

        btnBuy.setAttribute("onclick", "if(pontosAtual - " + pickPreços[i] + " < 0) {this.disabled = true;}else{pontosAtual = pontosAtual - " + pickPreços[i] + "; document.getElementById('placar_de_pontos').innerHTML = 'pontos:' + pontosAtual + ''; this.disabled = true;} this.innerHTML = 'VENDIDO!'; multiplicador = " + Eficiencia[i] + ";pickId[" + i + "] =  pickId[" + i + "] + 1;");
        var pickName = document.createElement("span");
        pickName.setAttribute("id", "pickName");
        pickName.innerHTML = "picareta de " + picaretas[i] + "";
        itemFrame.appendChild(pickName);

        itemFrame.appendChild(btnBuy);
        btnBuy.innerHTML = "R$" + pickPreços[i] + ",00";

        itemList.appendChild(itemFrame);
        itemFrame.appendChild(itemImg);     
           
        if(pontosAtual < pickPreços[i]) {
            btnBuy.disabled = true;
        }
        if(pickId[i] != 1) {
            btnBuy.disabled = true;
            document.getElementById("btnBuy" + i).innerHTML = "VENDIDO!";
        } 
    }
    for (var i=0;i<minasIMG.length;i++) {
        var mineFrame = document.createElement("div");
        mineFrame.setAttribute("id", "mineFrame");
        mineList.appendChild(mineFrame);

        var mineIMG = document.createElement("img");
        mineIMG.setAttribute("id", "mineIMG");
        mineIMG.setAttribute("src", "" + minasIMG[i] + "");
        mineFrame.appendChild(mineIMG);

        var mineName = document.createElement("span");
        mineName.setAttribute("id", "mineName");
        mineFrame.setAttribute("id", "mineFrame");

        var mineBtn = document.createElement("button");
        mineBtn.setAttribute("id", "btnBuyM" + i);
        mineBtn.setAttribute("class", "btnBuy");
        mineName.innerHTML = minas[i];
        mineBtn.innerHTML = "R$" + minasPreços[i] + ",00";
        if (pontosAtual < minasPreços[i]) {
            mineBtn.disabled = true;
        }
        mineBtn.setAttribute("onclick", "if(pontosAtual < " + minasPreços[i] + ") {this.disabled = true;}else{pontosAtual = pontosAtual - " + minasPreços[i] + "; document.getElementById('placar_de_pontos').innerHTML = 'pontos:' + pontosAtual + ''; this.disabled = true;} this.innerHTML = 'VENDIDO!'; multMina = " + minaRenda[i] + ";minaId[" + i + "] =  minaId[" + i + "] + 1;document.getElementById('click_area').style.backgroundImage = 'url(" + minasIMG[i] + ")';document.getElementById('click_area').style.backgroundSize = 'cover';");
        
        if (pontosAtual < minasPreços[i]) {
            mineBtn.disabled = true;
        }

        mineFrame.appendChild(mineName);
        mineFrame.appendChild(mineBtn);
        if(minaId[i] != 1) {
            mineBtn.disabled = true;
            document.getElementById("btnBuyM" + i).innerHTML = "VENDIDO!";
        } 
    }
    //mudando cordenada y para não voltar após a animação
    setTimeout(() => {shopDiv.style.top = "90px";}, 3000);
    //habilitando botão de voltar apenas após o término da animação para evitar bugs
    setTimeout(() => {backButton.disabled = false;}, 1600);



    function close_shop() {
        shopDiv.style.animation = "menu-up 1.7s 1";

        //deleta o shop após animação
        setTimeout(() => {document.getElementById("click_area").removeChild(shopDiv);
        document.getElementById("btn_loja").disabled = false;}, 1500);

        //habilita ganho de pontos E habilita botão de abrir loja
        setTimeout(() => {document.getElementById("click_area").setAttribute("onclick", "clicked()");}, 450);
    }
}

