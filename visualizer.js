var visualizer=new function()
{
    var DOMTemplate;
    var builds = [];
    var container;
    var factorials = [1,1];
    /*
    var colorScale = ["#ffffff", 
        "#fdfcff", "#f9f9ff", "#f5f6ff", "#f1f3ff", "#ebf1ff", "#e5eeff", "#ddedff", "#d4ebff", "#caeaff", "#bfe9fd", 
        "#b3e8f7", "#a7e8ef", "#9be7e4", "#91e7d8", "#88e6cb", "#81e4bd", "#7be3b0", "#78e1a4", "#75de98", "#74dc8e", 
        "#73d984", "#73d67b", "#73d372", "#74d06a", "#75cd63", "#76ca5c", "#78c656", "#7ac350", "#7cbf4b", "#7ebc46", 
        "#80b841", "#83b53d", "#85b139", "#87ad35", "#8aa932", "#8da52f", "#8fa12c", "#929d2a", "#959927", "#979525", 
        "#9a9024", "#9d8c22", "#9f8721", "#a28321", "#a47e20", "#a77920", "#a97420", "#ab6f21", "#ad6a22", "#af6423", 
        "#b05f25", "#b15a27", "#b25429", "#b24f2c", "#b24a2f", "#b14532", "#b04036", "#ae3b39", "#ac373d", "#a93340", 
        "#a63043", "#a32d46", "#9f2a49", "#9c274b", "#98254d", "#93234f", "#8f2151", "#8b1f52", "#871e54", "#821c55", 
        "#7e1b55", "#791a56", "#751856", "#701756", "#6b1756", "#671656", "#621555", "#5e1454", "#591353", "#551352", 
        "#501251", "#4c124f", "#48114d", "#43104b", "#3f1049", "#3b0f47", "#370f44", "#330e42", "#2f0e3f", "#2b0d3c", 
        "#270c38", "#240c35", "#200b32", "#1c0a2d", "#180929", "#140823", "#0f071c", "#0a0514", "#05030a", "#000000"
    ];
    
    var colorScale = ['#ffffff',
        '#faf9ff','#f5f3fe','#efeefe','#e8e9fd','#e1e5fc','#dae0fa','#d2ddf8','#cad9f6','#c2d6f3','#bad3f0','#b2d0ec',
        '#a9cde7','#a1cbe2','#99c9dd','#92c6d7','#8ac4d0','#83c2c9','#7cbfc2','#76bdbb','#70bbb3','#6ab8ab','#65b5a2',
        '#60b39a','#5cb091','#58ad89','#55a980','#52a678','#50a370','#4e9f68','#4d9b60','#4c9758','#4b9351','#4b8e4a',
        '#4b8a43','#4b853d','#4b8038','#4c7b32','#4d772d','#4e7229','#4f6d25','#506822','#51631f','#525e1c','#52591a',
        '#535418','#544f17','#544b16','#544615','#544215','#543d15','#543915','#533515','#523116','#512e16','#502b17',
        '#4e2718','#4d2419','#4b211a','#481f1b','#461c1c','#431a1d','#41181d','#3e161e','#3b141e','#38131f','#35111f',
        '#31101f','#2e0f1f','#2b0e1f','#280d1e','#250c1e','#220b1d','#1f0b1c','#1c0a1b','#19091a','#160919','#140817',
        '#120816','#0f0714','#0d0713','#0c0611','#0a0610','#08060e','#07050d','#06050b','#05040a','#040408','#030307',
        '#020306','#020305','#010204','#010203','#010102','#000102','#000101','#000001','#000000','#000000','#000000',
    ];
    */
    var colorScale = ['255,255,255',
        '250,249,255','245,243,254','239,238,254','232,233,253','225,229,252','218,224,250','210,221,248','202,217,246','194,214,243','186,211,240','178,208,236',
        '169,205,231','161,203,226','153,201,221','146,198,215','138,196,208','131,194,201','124,191,194','118,189,187','112,187,179','106,184,171','101,181,162',
        ' 96,179,154',' 92,176,145',' 88,173,137',' 85,169,128',' 82,166,120',' 80,163,112',' 78,159,104',' 77,155, 96',' 76,151, 88',' 75,147, 81',' 75,142, 74',
        ' 75,138, 67',' 75,133, 61',' 75,128, 56',' 76,123, 50',' 77,119, 45',' 78,114, 41',' 79,109, 37',' 80,104, 34',' 81, 99, 31',' 82, 94, 28',' 82, 89, 26',
        ' 83, 84, 24',' 84, 79, 23',' 84, 75, 22',' 84, 70, 21',' 84, 66, 21',' 84, 61, 21',' 84, 57, 21',' 83, 53, 21',' 82, 49, 22',' 81, 46, 22',' 80, 43, 23',
        ' 78, 39, 24',' 77, 36, 25',' 75, 33, 26',' 72, 31, 27',' 70, 28, 28',' 67, 26, 29',' 65, 24, 29',' 62, 22, 30',' 59, 20, 30',' 56, 19, 31',' 53, 17, 31',
        ' 49, 16, 31',' 46, 15, 31',' 43, 14, 31',' 40, 13, 30',' 37, 12, 30',' 34, 11, 29',' 31, 11, 28',' 28, 10, 27',' 25,  9, 26',' 22,  9, 25',' 20,  8, 23',
        ' 18,  8, 22',' 15,  7, 20',' 13,  7, 19',' 12,  6, 17',' 10,  6, 16','  8,  6, 14','  7,  5, 13','  6,  5, 11','  5,  4, 10','  4,  4,  8','  3,  3,  7',
        '  2,  3,  6','  2,  3,  5','  1,  2,  4','  1,  2,  3','  1,  1,  2','  0,  1,  2','  0,  1,  1','  0,  0,  1','  0,  0,  0','  0,  0,  0','  0,  0,  0'
    ];
    
    var elemTypes = ['Im','Pn','Sl','Cl','El','Ht','Tx','Bl','Cr','Gs','Mg','Rd','Vr','Vd','Ab'];
    var elemNames = ['Impact','Puncture','Slash','Cold','Electricity','Heat','Toxin','Blast','Corrosive','Gas','Magnetic','Radiation','Viral','Void','Absolute'];
    
    function cpyArr(a)
    {
        c = [];
        for (var index in a)
        {
            c[index] = a[index];
        }
        return c;
    }
    
    function sumArrArr(a,b)
    {
        c = [];
        for (var index in a)
        {
            c[index] = a[index]+b[index];
        }
        return c;
    }
    
    function sumArrScl(a,b)
    {
        c = [];
        for (var index in a)
        {
            c[index] = a[index]+b;
        }
        return c;
    }
    
    function sumArrRed(a)
    {
        c = 0;
        for (var index in a)
        {
            c = c + a[index];
        }
        return c;
    }
    
    function mulArrScl(a,b)
    {
        c = [];
        for (var index in a)
        {
            c[index] = a[index]*b;
        }
        return c;
    }
    
    function divArrScl(a,b)
    {
        c = [];
        for (var index in a)
        {
            c[index] = a[index]/b;
        }
        return c;
    }
    
    function factorial(n)
    {
        n = Math.floor(n);
        if (n in factorials)
        {
            return factorials[n];
        }
        
        for (var i=factorials.length;i<=n;i++)
        {
            factorials.push(factorials[i-1]*i);
        }
        return(factorials[n]);
    }
    
    function binCalc(p,n,k)
    {
        return factorial(n) / (factorial(k)*factorial(n-k)) * Math.pow(p,k) * Math.pow(1-p,n-k);
    }
    
    function crossProd(u,v)
    {
        return [u[1]*v[2] - u[2]*v[1],
                u[2]*v[0] - u[0]*v[2],
                u[0]*v[1] - u[1]*v[0]];
    }
    
    function binDistPlot(idStr)
    {
        var sizeX = 500;
        var sizeY = 100;
        var areaPlots = [];
        var parentElement;
        var currN = 0;
        
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        // svg.className = 'sttGraph';
        // svg.width = '100';
        // svg.height = '100';
        // svg.viewbox = '0 0 100 100';
        // svg.preserveAspectRatio = 'none';
        
        svg.setAttribute('class', 'sttSVG');
        svg.setAttribute('width', sizeX);
        svg.setAttribute('height', sizeY);
        svg.setAttribute('viewBox', '0 0 '+sizeX+' '+sizeY);
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        // var style = document.createElementNS('http://www.w3.org/2000/svg', 'style')
        // style.innerHTML="polygon {mix-blend-mode: multiply;}";
        // svg.appendChild(style);
        
        var avgline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        avgline.setAttribute('style', 'fill:none; stroke:rgb(255,159,127); stroke-width:2; z-index:1000;');
        svg.appendChild(avgline);
        
        this.plot = function(n,pellets)
        {
            var accumProb = {};
            var pVals = [];
            var nPellets = Math.ceil(n);
            var split = n + 1 - Math.ceil(n);
            var pPP = [];
            
            if (n == currN)
            {
                return;
            }
            
            currN = n;
            
            for (var p=0;p<0.99;p+=0.01)
            {
                pVals.push(p);
                accumProb[p] = 0;
            }
            for (var p=0.99;p<=1;p+=0.0001)
            {
                pVals.push(p);
                accumProb[p] = 0;
            }
            //console.log(accumProb);
            
            var linePointsStr = ' ';
            for (var ip in pVals)
            {
                var pAny = pVals[ip];
                var p = 1-Math.pow(1-pAny,1/pellets);
                pPP[ip] = p;
                linePointsStr = linePointsStr + (pAny*sizeX) + ',' + (sizeY*(1-p)).toFixed(10) + ' ';
            }
            avgline.setAttribute('points',linePointsStr);
            
            for (var i = 0; i < Math.max(areaPlots.length,nPellets+1); i++)
            {
                // var k = i+1;
                var k = i;
                
                if (i >= nPellets+1)
                {
                    svg.removeChild(areaPlots.pop());
                }
                else
                {
                    if (i >= areaPlots.length)
                    {
                        i = areaPlots.push(document.createElementNS('http://www.w3.org/2000/svg', 'polygon'))-1;
                        areaPlots[i].setAttribute('style', 'fill:'+(k*2>=100?'rgba(0,0,0,0.3)':'rgba('+colorScale[k*2+1]+',0.2)')+'; stroke:'+'rgba(0,0,0,'+0.5*Math.pow(0.9,i)+')'+'; stroke-width:1;');
                        // areaPlots[i].setAttribute('style', 'fill:'+'rgba(255, 159, 127,0.07)'+'; stroke:rgba(255, 159, 127,0.2); stroke-width:1;');
                        svg.appendChild(areaPlots[i]);
                    }
                    
                    //var accumProb = 0;
                    var pointsStr = ' '+sizeX+','+sizeY+' 0,'+sizeY+' ';
                    
                    for (var ip in pVals)
                    {
                        var pAny = pVals[ip];
                        var p = pPP[ip];
                        // var p = 1-Math.pow(1-pAny,1/pellets);
                        //console.log(pellets,p);
                        // pointsX.push(p*100);
                        // pointsY.push(100-100*binCalc(p,n,k));
                        var prob1 = binCalc(p,nPellets,k) * split;
                        var prob2 = k < nPellets ? binCalc(p,nPellets-1,k) * (1-split) : 0;
                        var prob = prob1 + prob2;
                        accumProb[pAny] += prob;
                        //console.log(p,n,k,accumProb[pAny])
                        pointsStr = pointsStr + (pAny*sizeX) + ',' + (sizeY*accumProb[pAny]).toFixed(10) + ' ';
                        //var teststr = ' ' + (p*200) + ',' + (100*accumProb[pAny]).toFixed(10) + ' ';
                        //console.log(teststr);
                    }
                    //console.log('bp',pointsStr);
                    areaPlots[i].setAttribute('points',pointsStr);
                }
            }
            
            svg.appendChild(avgline);
        }
        
        this.setParent = function(node)
        {
            this.removeParent();
            parentElement = node;
            node.appendChild(svg);
        }
        
        this.removeParent = function()
        {
            if (parentElement != null)
            {
                parentElement.removeChild(svg);
                parentElement = null;
            }
        }
    }
    
    function label(idStr, labelName, extraClasses, zIndex)
    {
        this.DOMLabel = document.createElement('div');
        this.DOMLabel.className = 'dispOrigin';
        this.DOMLabel.id = labelName+'Label'+idStr;
        this.DOMLabel.style.zIndex = zIndex+100;
        
        this.DOMElement;
        var field;
        
        field = document.createElement('div');
        field.className = 'dispLabel ' + extraClasses;
        this.DOMElement = field;
        
        var parentElement;
        
        this.DOMLabel.appendChild(field);
        
        this.setTransform = function(x,y,z,width,length,vector,normal,azimuth,altitude,scale)
        {
            var perspectiveT = '';
            var azimuthMod = azimuth % Math.PI*2;
            var i;
            
            //perspectiveT = "perspective(100em) ";
            
            var across = crossProd(normal,vector);
            var matrixStr = 'matrix3d(' +
                vector[0]   +','+   vector[1]   +','+   vector[2]   +',0,'+
                across[0]   +','+   across[1]   +','+   across[2]   +',0,'+
                normal[0]   +','+   normal[1]   +','+   normal[2]   +',0,'+
                '0,0,0,1)';
            
            //field.style.width = length*scale+'em';
            //field.style.height = width*scale+'em';
            
            field.style.transform = perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+(x+0     )*scale+'em,'+(y+0     )*scale+'em,'+(z+0     )*scale+'em) '+matrixStr;
        }
        
        this.setParent = function(node)
        {
            this.removeParent();
            parentElement = node;
            node.appendChild(this.DOMLabel);
        }
        
        this.removeParent = function()
        {
            if (parentElement != null)
            {
                parentElement.removeChild(this.DOMLabel);
                parentElement = null;
            }
        }
        
        this.setZIndex = function(zIndex)
        {
            this.DOMLabel.style.zIndex = zIndex;
        }
        
        this.setContents = function(contents)
        {
            field.innerHTML = contents;
        }
    }
    
    
    function axis(idStr, axisName, extraClasses, zIndex, majInt, minInt)
    {
        this.DOMAxis = document.createElement('div');
        this.DOMAxis.className = 'dispOrigin';
        this.DOMAxis.id = axisName+'Axis'+idStr;
        this.DOMAxis.style.zIndex = zIndex+100;
        
        var line;
        var majTickTemplate;
        var minTickTemplate;
        var majTicks = [];
        var minTicks = [];
        var totalTickDist;
        
        line = document.createElement('div');
        line.className = 'dispAxis ' + extraClasses;
        
        majTickTemplate = document.createElement('div');
        majTickTemplate.className = 'dispAxis ' + extraClasses;
        
        var parentElement;
        
        this.DOMAxis.appendChild(line);
        
        /*
        for (var i in majInt)
        {
            
        }
        */
        
        this.setTransform = function(x,y,z,width,length,vector,normal,phase,azimuth,altitude,scale)
        {
            var perspectiveT = '';
            var azimuthMod = azimuth % Math.PI*2;
            var phaseMod = phase % 1;
            var i;
            var accumTickDist;
            phaseMod = phaseMod < 1 ? phaseMod + 1 : phaseMod;
            
            //perspectiveT = "perspective(100em) ";
            
            var across = crossProd(normal,vector);
            var matrixStr = 'matrix3d(' +
                vector[0]   +','+   vector[1]   +','+   vector[2]   +',0,'+
                across[0]   +','+   across[1]   +','+   across[2]   +',0,'+
                normal[0]   +','+   normal[1]   +','+   normal[2]   +',0,'+
                '0,0,0,1)';
            
            line.style.width = length*scale+'em';
            line.style.height = width*scale+'em';
            
            line.style.transform = perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+(x+0     )*scale+'em,'+(y+0     )*scale+'em,'+(z+0     )*scale+'em) '+matrixStr;
            
            
            //if (majInt.length == 0)
            if (majInt == 0)
            {
                return;
            }
            
            
            
            nMajTicks = Math.floor(length/majInt+1);
            i = 0;
            accumTickLength = 0;
            
            
            
            for (var i = majTicks.length-1; i >= nMajTicks && i >= 0; i--)
            {
                this.DOMAxis.removeChild(majTicks.pop());
            }
            
            for (var i = 0; i < nMajTicks; i++)
            {
                if (i >= majTicks.length)
                {
                    i = majTicks.push(majTickTemplate.cloneNode(true))-1;
                    this.DOMAxis.appendChild(majTicks[i]);
                }
                
                if (azimuthMod < Math.PI)
                {
                    majTicks[i].style.zIndex = i+1;
                }
                else
                {
                    majTicks[i].style.zIndex = nMajTicks-i;
                }
                
                majTicks[i].style.width     = scale*width     + 'em';
                majTicks[i].style.height    = scale*width     + 'em';
                var xP = (i+phaseMod-1)*majInt;
                majTicks[i].style.transform = perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+(x+0     )*scale+'em,'+(y+0     )*scale+'em,'+(z+0     )*scale+'em) '+matrixStr+' translate3d('+xP*scale+'em,'+width*scale+'em,0)';
                opacity = 1;
                if (xP < 0)
                {
                    opacity = 0;
                }
                if (xP > length)
                {
                    opacity = 0;
                }
                opacity = Math.max(0,Math.min(opacity,1));
                majTicks[i].style.opacity = opacity;
                //xBaffles[i].style.visibility = "visible";
            }
            
        }
        
        this.setParent = function(node)
        {
            this.removeParent();
            parentElement = node;
            node.appendChild(this.DOMAxis);
        }
        
        this.removeParent = function()
        {
            if (parentElement != null)
            {
                parentElement.removeChild(this.DOMAxis);
                parentElement = null;
            }
        }
        
        this.setZIndex = function(zIndex)
        {
            this.DOMAxis.style.zIndex = zIndex;
        }
        
        this.setTransform(0,0,0,0.1,2,[1,0,0],[0,0,1],0,-Math.PI/6,-Math.PI/6,1);
    }
    
    function box(idStr, boxName, extraClasses, zIndex, showBackFace, baffleDist)
    {
        this.DOMBox = document.createElement('div');
        this.DOMBox.className = 'dispOrigin';
        this.DOMBox.id = boxName+'Box'+idStr;
        this.DOMBox.style.zIndex = zIndex+100;
        
        var sideID = 0;
        var sides = [];
        var borderColor = '';
        var sideColor = '';
        
        var baffleTemplate = document.createElement('div');
        baffleTemplate.className = 'dispBlkBaffle ' + extraClasses;
        //baffleTemplate.style.opacity = 0.5;
        
        var xBaffles = [];
        var yBaffles = [];
        var zBaffles = [];
        var parentElement;
        
        sides[0b000] = document.createElement('div');
        sides[0b000].className = 'dispBlkSide ' + extraClasses;
        
        sides[0b001] = sides[0b000].cloneNode(false);
        sides[0b010] = sides[0b000].cloneNode(false);
        sides[0b011] = sides[0b000].cloneNode(false);
        sides[0b100] = sides[0b000].cloneNode(false);
        sides[0b101] = sides[0b000].cloneNode(false);
        
        for (sideID in sides)
        {
            this.DOMBox.appendChild(sides[sideID]);
        }
        
        function baffleF(val,step)
        {
            return Math.floor(val/step)+1;
        }
        
        function baffleL(val,step)
        {
            return Math.ceil(val/step)-1;
        }
        
        this.setTransform = function(x,y,z,width,height,depth,azimuth,altitude,scale)
        {
            //var baffleDist = 5;
            var perspectiveT = "";
            var azimuthMod = azimuth % Math.PI*2;
            var minDim;
            
            //perspectiveT = "perspective(100em) ";
            if (azimuthMod < Math.PI * 0.5)
            {
                sides[0b000].style.zIndex = Math.ceil((depth+1)*100);
                sides[0b001].style.zIndex = 0;
                sides[0b010].style.zIndex = 0;
                sides[0b011].style.zIndex = Math.ceil((width+1)*100);
            }
            else if (azimuthMod < Math.PI * 1.0)
            {
                sides[0b000].style.zIndex = 0;
                sides[0b001].style.zIndex = Math.ceil((depth+1)*100);
                sides[0b010].style.zIndex = 0;
                sides[0b011].style.zIndex = Math.ceil((width+1)*100);
            }
            else if (azimuthMod < Math.PI * 1.5)
            {
                sides[0b000].style.zIndex = 0;
                sides[0b001].style.zIndex = Math.ceil((depth+1)*100);
                sides[0b010].style.zIndex = Math.ceil((width+1)*100);
                sides[0b011].style.zIndex = 0;
            }
            else
            {
                sides[0b000].style.zIndex = Math.ceil((depth+1)*100);
                sides[0b001].style.zIndex = 0;
                sides[0b010].style.zIndex = Math.ceil((width+1)*100);
                sides[0b011].style.zIndex = 0;
            }
            
            if (altitude < 0)
            {
                sides[0b100].style.zIndex = 0;
                sides[0b101].style.zIndex = Math.ceil((height+1)*100);
            }
            else
            {
                sides[0b100].style.zIndex = Math.ceil((height+1)*100);
                sides[0b101].style.zIndex = 0;
            }
            
            sides[0b000].style.width    = scale*width     + 'em';
            sides[0b001].style.width    = scale*width     + 'em';
            sides[0b000].style.height   = scale*height    + 'em';
            sides[0b001].style.height   = scale*height    + 'em';
            
            sides[0b010].style.width    = scale*depth     + 'em';
            sides[0b011].style.width    = scale*depth     + 'em';
            sides[0b010].style.height   = scale*height    + 'em';
            sides[0b011].style.height   = scale*height    + 'em';
            
            sides[0b100].style.width    = scale*width     + 'em';
            sides[0b101].style.width    = scale*width     + 'em';
            sides[0b100].style.height   = scale*depth     + 'em';
            sides[0b101].style.height   = scale*depth     + 'em';
            
            for (var i in sides)
            {
                if ((sides[i].style.zIndex == 0 && !showBackFace) || sides[i].style.width=='0em' || sides[i].style.height=='0em')
                {
                    sides[i].style.display = 'none';
                    //sides[i].style.visibility = 'hidden';
                }
                else
                {
                    sides[i].style.display = 'block';
                    //sides[i].style.visibility = 'inherit';
                }
            }
            
            if (sides[0b000].style.zIndex != 0 || showBackFace)
                sides[0b000].style.transform = perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+(x+0     )*scale+'em,'+(y+0     )*scale+'em,'+(z+0     )*scale+'em) rotateX( 000deg) rotateY( 000deg)';
            if (sides[0b001].style.zIndex != 0 || showBackFace)
                sides[0b001].style.transform = perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+(x+width )*scale+'em,'+(y+0     )*scale+'em,'+(z-depth )*scale+'em) rotateX( 000deg) rotateY( 180deg)';
            if (sides[0b010].style.zIndex != 0 || showBackFace)
                sides[0b010].style.transform = perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+(x+0     )*scale+'em,'+(y+0     )*scale+'em,'+(z-depth )*scale+'em) rotateX( 000deg) rotateY(-090deg)';
            if (sides[0b011].style.zIndex != 0 || showBackFace)
                sides[0b011].style.transform = perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+(x+width )*scale+'em,'+(y+0     )*scale+'em,'+(z-depth )*scale+'em) rotateX( 000deg) rotateY(-090deg)';
            if (sides[0b100].style.zIndex != 0 || showBackFace)
                sides[0b100].style.transform = perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+(x+0     )*scale+'em,'+(y+0     )*scale+'em,'+(z-depth )*scale+'em) rotateX(-090deg) rotateY( 000deg)';
            if (sides[0b101].style.zIndex != 0 || showBackFace)
                sides[0b101].style.transform = perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+(x+0     )*scale+'em,'+(y-height)*scale+'em,'+(z+0     )*scale+'em) rotateX( 090deg) rotateY( 000deg)';
            
            /*
            var borderWidth = (scale == 0 ? scale : 1/scale);
            for (var i in sides)
            {
                sides[i].style.borderWidth = borderWidth+'px';
            }
            */
            
            if (baffleDist == 0)
            {
                return;
            }
            
            minDim = Math.min(Math.abs(width),Math.abs(height),Math.abs(depth));
            this.DOMBox.style.opacity = minDim > baffleDist ? 1 : minDim;
            
            xF = baffleF(x,baffleDist);
            xL = baffleL(x+width,baffleDist);
            
            yF = baffleF(y-height,baffleDist);
            yL = baffleL(y,baffleDist);
            
            zF = baffleF(z-depth,baffleDist);
            zL = baffleL(z,baffleDist);
            
            for (var i = xBaffles.length-1; i > xL-xF && i >= 0; i--)
            {
                //xBaffles[i].style.visibility = "hidden";
                this.DOMBox.removeChild(xBaffles.pop());
            }
            
            for (var i = 0; i < xL-xF+1; i++)
            {
                if (i >= xBaffles.length)
                {
                    i = xBaffles.push(baffleTemplate.cloneNode(true))-1;
                    this.DOMBox.appendChild(xBaffles[i]);
                }
                
                if (azimuthMod < Math.PI)
                {
                    xBaffles[i].style.zIndex = i+1;
                }
                else
                {
                    xBaffles[i].style.zIndex = xL-xF-i;
                }
                
                xBaffles[i].style.width     = scale*depth     + 'em';
                xBaffles[i].style.height    = scale*height    + 'em';
                var xP = (xF + i)*baffleDist;
                xBaffles[i].style.transform = perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+(xP      )*scale+'em,'+(y+0     )*scale+'em,'+(z-depth )*scale+'em) rotateX( 000deg) rotateY(-090deg)';
                opacity = 1;
                if (i == 0)
                {
                    opacity -= 1-(xF*baffleDist-x);
                }
                if (i == xL-xF)
                {
                    opacity -= 1-((x+width)-xL*baffleDist);
                }
                opacity = Math.max(0,Math.min(opacity,1));
                xBaffles[i].style.opacity = opacity;
                //xBaffles[i].style.visibility = "visible";
            }
            
            
            for (var i = yBaffles.length-1; i > yL-yF && i >= 0; i--)
            {
                //yBaffles[i].style.visibility = "hidden";
                this.DOMBox.removeChild(yBaffles.pop());
            }
            
            for (var i = 0; i < yL-yF+1; i++)
            {
                if (i >= yBaffles.length)
                {
                    i = yBaffles.push(baffleTemplate.cloneNode(true))-1;
                    this.DOMBox.appendChild(yBaffles[i]);
                }
                
                if (altitude >= Math.PI)
                {
                    yBaffles[i].style.zIndex = i+1;
                }
                else
                {
                    yBaffles[i].style.zIndex = yL-yF-i;
                }
                
                yBaffles[i].style.width     = scale*width     + 'em';
                yBaffles[i].style.height    = scale*depth     + 'em';
                var yP = (yF + i)*baffleDist;
                yBaffles[i].style.transform = perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+(x+0     )*scale+'em,'+(yP      )*scale+'em,'+(z-depth )*scale+'em) rotateX(-090deg) rotateY( 000deg)';
                opacity = 1;
                if (i == 0)
                {
                    opacity -= 1-(yF*baffleDist-(y-height));
                }
                if (i == yL-yF)
                {
                    opacity -= 1-(y-yL*baffleDist);
                }
                opacity = Math.max(0,Math.min(opacity,1));
                yBaffles[i].style.opacity = opacity;
                //yBaffles[i].style.visibility = "visible";
            }
            
            
            for (var i = zBaffles.length-1; i > zL-zF && i >= 0; i--)
            {
                //zBaffles[i].style.visibility = "hidden";
                this.DOMBox.removeChild(zBaffles.pop());
            }
            
            for (var i = 0; i < zL-zF+1; i++)
            {
                if (i >= zBaffles.length)
                {
                    i = zBaffles.push(baffleTemplate.cloneNode(true))-1;
                    this.DOMBox.appendChild(zBaffles[i]);
                }
                
                if (azimuthMod < Math.PI * 0.5 || azimuthMod >= Math.PI * 1.5)
                {
                    zBaffles[i].style.zIndex = i+1;
                }
                else
                {
                    zBaffles[i].style.zIndex = zL-zF-i;
                }
                
                zBaffles[i].style.width     = scale*width     + 'em';
                zBaffles[i].style.height    = scale*height    + 'em';
                var zP = (zF + i)*baffleDist;
                zBaffles[i].style.transform = perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+(x+0     )*scale+'em,'+(y+0     )*scale+'em,'+(zP      )*scale+'em) rotateX( 000deg) rotateY( 000deg)';
                opacity = 1;
                if (i == 0)
                {
                    opacity -= 1-(zF*baffleDist-(z-depth));
                }
                if (i == zL-zF)
                {
                    opacity -= 1-(z-zL*baffleDist);
                }
                opacity = Math.max(0,Math.min(opacity,1));
                zBaffles[i].style.opacity = opacity;
                //zBaffles[i].style.visibility = "visible";
            }
        }
        
        this.setParent = function(node)
        {
            this.removeParent();
            parentElement = node;
            node.appendChild(this.DOMBox);
        }
        
        this.removeParent = function()
        {
            if (parentElement != null)
            {
                parentElement.removeChild(this.DOMBox);
                parentElement = null;
            }
        }
        
        this.setZIndex = function(zIndex)
        {
            this.DOMBox.style.zIndex = zIndex;
        }
        
        this.setBorderColor = function(color)
        {
            if (borderColor == color) {return;}
            borderColor = color;
            for (var i in sides)
            {
                sides[i].style.borderColor = color;
            }
        }
        
        this.setSideColor = function(color)
        {
            if (sideColor == color) {return;}
            sideColor = color;
            for (var i in sides)
            {
                sides[i].style.backgroundColor = color;
            }
        }
        
        this.setTransform(0,0,0,2,2,2,-Math.PI/6,-Math.PI/6,1);
    }
    
    function build(id)
    {
        var thisBuild = this;
        var i;
        
        var idStr;
        var descendantList;
        
        var DOMIDDisp;
        
        //hook and parse input values
        var DOMParams = {};
        var params = {};
        var pParams = {};
        var vParams = {};
        var DOMWepForm;
        var DOMModForm;
        var DOMDPSDisp;
        var DOMDPSVals = [];
        // var DOMDPSWShotVal;
        // var DOMDPSMShotVal;
        // var DOMDPSMSttsVal;
        // var DOMDPSWDPSVal;
        // var DOMDPSMDPSVal;
        // var DOMDPSWSDPSVal;
        // var DOMDPSMSDPSVal;
        var DOMDPSShotDispOrigin;
        var DOMDPSStEfDispOrigin;
        var DOMDPSSttsDispOrigin;
        var DOMDPSSttGraphOrigin;
        var DOMDPSRateDispOrigin;
        
        var DOMAnimateChangeButton;
        
        var DOMDPSBars = [];
        
        var moddedStEfDispBoxes = [];
        var shotDispBoxes = [];
        var moddedSttsDispLabel = [];
        var moddedSttsDispBoxes = [];
        var moddedSttsOutlBoxes = [];
        var moddedSttGraphLabel;
        var moddedSttGraphAxis;
        var moddedSttGraphSVG;
        var moddedRateDispBoxes = [];
        var weaponRateDispBoxes = [];
        var rateTimeAxis;
        var rateFireAxis;
        
        var DPSDispBaffleDist = 5;
        
        var viewAzimuth = -Math.PI/6*1.2;
        var viewAltitude = -Math.PI/6*0.5;
        params['ShotScale']=0.18;
        params['SttsScale']=0.18;
        params['RateScale']=0.18;
        // var DPSShotScale = 0.2;
        // var DPSSttsScale = 0.2;
        // var DPSRateScale = 0.2;
        
        var DPSTimeRange = 4.5;
        
        var scrollingEnabled = -1;
        
        var animationStart = null;
        var animationLastT = null;
        var animationID = null;
        var transitionOngoing = false;
        
        this.verifyParamAndCalculate = function(eventParamName)
        {
            console.log(eventParamName);
            this.verifyAllParamsAndCalculate();
            /*
            iElement = DOMParams[eventParamName];
            var iValue = parseFloat(iElement.value);
            var isWep = eventParamName.startsWith("iWeap");
            if (isNaN(iValue))
            {
                iElement.value = params[eventParamName].toFixed(isWep ? 1 : 3);
            }
            else
            {
                if (isWep && iValue < 0) {iValue = 0;}
                if (eventParamName.startsWith("Mod") && iValue < -100) {iValue = -100;}
                if (eventParamName == "WepFR" && iValue < 1/60) {iValue = 1/60;}
                if (eventParamName == "WepCons" && iValue < 1/60) {iValue = 1/60;}
                iElement.value = iValue.toFixed(isWep ? 1 : 3);
                
                if (params[eventParamName] != iValue)
                {
                    params[eventParamName] = iValue;
                    this.updateDPS(true);
                }
            }
            */
        }
        
        this.verifyAllParamsAndCalculate = function()
        {
            console.log("submit");
            var modified = false;
            
            for (var paramName in DOMParams)
            {
                if (Array.isArray(DOMParams[paramName]))
                {
                    for (var elemType in DOMParams[paramName])
                    {
                        iElement = DOMParams[paramName][elemType];
                        var iValue = parseFloat(iElement.value);
                        //var isWep = paramName.startsWith("Wep");
                        var isFR = paramName.startsWith("WepFR");
                        if (isNaN(iValue))
                        {
                            // iElement.value = params[paramName].toFixed(isWep ? 1 : 3);
                            // iElement.value = params[paramName].toFixed(1);
                            iElement.value = params[paramName][elemType].toFixed(isFR ? 3 : 1);
                        }
                        else
                        {
                            if (isFR) iValue = Math.max(0.017,iValue);
                            modified = modified | (params[paramName][elemType] != iValue);
                            params[paramName][elemType] = iValue;
                            // iElement.value = iValue.toFixed(isWep ? 1 : 3);
                            // iElement.value = iValue.toFixed(1);
                            iElement.value = iValue.toFixed(isFR ? 3 : 1);
                        }
                    }
                }
                else
                {
                    iElement = DOMParams[paramName];
                    var iValue = parseFloat(iElement.value);
                    //var isWep = paramName.startsWith("Wep");
                    var isFR = paramName.startsWith("WepFR");
                    if (isNaN(iValue))
                    {
                        // iElement.value = params[paramName].toFixed(isWep ? 1 : 3);
                        // iElement.value = params[paramName].toFixed(1);
                        iElement.value = params[paramName].toFixed(isFR ? 3 : 1);
                    }
                    else
                    {
                        if (isFR) iValue = Math.max(0.017,iValue);
                        modified = modified | (params[paramName] != iValue);
                        params[paramName] = iValue;
                        // iElement.value = iValue.toFixed(isWep ? 1 : 3);
                        // iElement.value = iValue.toFixed(1);
                        iElement.value = iValue.toFixed(isFR ? 3 : 1);
                    }
                }
            }
            
            if (modified)
            {
                this.updateDPS(true);
            }
        }
        
        function calculateDPS(uparams)
        {
            var oldWFR = uparams['WepFR'];
            var oldMFR = uparams['MRate'];
            oldWFR = oldWFR == null? 1 : oldWFR;
            oldMFR = oldMFR == null? 1 : oldMFR;
            
            //damage
            uparams['WepDamageSum'] = sumArrRed(uparams['WepDamage']);
            
            uparams['DmgeBonus'] = uparams['ModDamage']/100;
            uparams['DmgeFactr'] = 1+uparams['DmgeBonus'];
            var ShotDXXX = mulArrScl(uparams['WepDamage'], uparams['DmgeFactr']);
            uparams['ModDamageSum'] = sumArrRed(ShotDXXX);
            uparams['RatDamageSum'] = uparams['ModDamageSum']/uparams['WepDamageSum'];
            
            //elemental
            uparams['ElemBonus'] = [];
            uparams['ElemAdded'] = [];
            for (var elemType in uparams['ModElemental'])
            {
                uparams['ElemBonus'][elemType] = uparams['ModElemental'][elemType]/100;
                uparams['ElemAdded'][elemType] = uparams['ElemBonus'][elemType] * uparams['ModDamageSum'];
                if (elemType == 'Im' || elemType == 'Pn' || elemType == 'Sl')
                {
                    if (uparams['WepDamageSum'] == 0)
                    {
                        uparams['ElemBonus'][elemType] = 0;
                        uparams['ElemAdded'][elemType] = 0;
                    }
                    else
                    {
                        uparams['ElemBonus'][elemType] = uparams['ElemBonus'][elemType] * uparams['WepDamage'][elemType]/uparams['WepDamageSum'];
                        uparams['ElemAdded'][elemType] = uparams['ElemBonus'][elemType] * ShotDXXX[elemType];
                    }
                }
            }
            uparams['ElemBonusSum'] = sumArrRed(uparams['ElemBonus']);
            uparams['ElemFactrSum'] = 1+uparams['ElemBonusSum'];
            //console.log(uparams['ElemAdded']);
            var ShotDEXX = sumArrArr(ShotDXXX, uparams['ElemAdded']);
            
            //multishot
            uparams['MultBonus'] = uparams['ModMultishot']/100;
            uparams['MultFactr'] = 1+uparams['MultBonus'];
            uparams['ModPellets'] = uparams['WepPellets'] * uparams['MultFactr'];
            var ShotDEMX = mulArrScl(ShotDEXX, uparams['MultFactr']);
            
            
            uparams['WCrtProbl'] = uparams['WepCC']/100;
            uparams['WCrtBonus'] = uparams['WepCD']-1;
            uparams['WCrtFactr'] = 1+uparams['WCrtProbl']*uparams['WCrtBonus'];
            uparams['MCrtProbl'] = uparams['WCrtProbl'] * (1+uparams['ModCC']/100);
            uparams['MCrtBonus'] = uparams['WepCD']*(1+uparams['ModCD']/100)-1;
            uparams['MCrtFactr'] = 1+uparams['MCrtProbl']*uparams['MCrtBonus'];
            uparams['RCrtFactr'] = uparams['MCrtFactr']/uparams['WCrtFactr'];
            var ShotDEMC = mulArrScl(ShotDEMX, uparams['MCrtFactr']);
            
            //damage per shot
            uparams['WShot'] = mulArrScl(uparams['WepDamage'], uparams['WCrtFactr']);
            uparams['WShotSum'] = sumArrRed(uparams['WShot']);
            
            uparams['MShot'] = ShotDEMC;
            uparams['MShotSum'] = sumArrRed(uparams['MShot']);
            uparams['RShotSum'] = uparams['WShotSum'] == 0 ? 0 : uparams['MShotSum'] / uparams['WShotSum'];
            
            //status
            uparams['StsCBonus'] = uparams['ModSC']/100;
            uparams['StsCFactr'] = 1+uparams['StsCBonus'];
            
            uparams['WStsC'] = Math.min(uparams['WepSC']/100,1);
            uparams['MStsC'] = Math.min(uparams['WStsC'] * uparams['StsCFactr'],1);
            
            uparams['WStsP'] = 1-Math.pow(1-uparams['WStsC'],1/uparams['WepPellets']);
            uparams['MStsP'] = 1-Math.pow(1-uparams['MStsC'],1/uparams['WepPellets']);
            uparams['RStsP'] = uparams['MStsP'] / uparams['WStsP'];
            
            uparams['WStts'] = uparams['WStsP'] * uparams['WepPellets'];
            uparams['MStts'] = uparams['MStsP'] * uparams['ModPellets'];
            uparams['RStts'] = uparams['MStts'] / uparams['WStts'];
            
            var split = uparams['ModPellets'] % 1;
            var prob1 = binCalc(uparams['MStsP'],Math.ceil(uparams['ModPellets']),0) * split;
            var prob2 = binCalc(uparams['MStsP'],Math.floor(uparams['ModPellets']),0) * (1-split);
            uparams['MStsO'] = 1-(prob1+prob2);
            uparams['RStsO'] = uparams['MStsO'] / uparams['WStsC'];
            
            uparams['MStsA'] = 1-binCalc(uparams['MStsP'],uparams['ModPellets'],0);
            uparams['RStsA'] = uparams['MStsA'] / uparams['WStsC'];
            
            var WSttsProportion = cpyArr(uparams['WepDamage']);
            var MSttsProportion = cpyArr(ShotDEMX);
            WSttsProportion['Im'] = WSttsProportion['Im']*4;
            WSttsProportion['Pn'] = WSttsProportion['Pn']*4;
            WSttsProportion['Sl'] = WSttsProportion['Sl']*4;
            MSttsProportion['Im'] = MSttsProportion['Im']*4;
            MSttsProportion['Pn'] = MSttsProportion['Pn']*4;
            MSttsProportion['Sl'] = MSttsProportion['Sl']*4;
            var WSttsSum = sumArrRed(WSttsProportion);
            var MSttsSum = sumArrRed(MSttsProportion);
            console.log(MSttsProportion,MSttsSum);
            WSttsProportion = divArrScl(WSttsProportion,WSttsSum);
            MSttsProportion = divArrScl(MSttsProportion,MSttsSum);
            uparams['WStsCProp'] = WSttsProportion;
            uparams['MStsCProp'] = MSttsProportion;
            
            uparams['StsDBonus'] = uparams['ModSD'] / 100;
            uparams['StsDFactr'] = 1+uparams['StsDBonus'];
            // uparams['WStsD']['Im'] = 1;
            // uparams['WStsD']['Pn'] = 6;
            // uparams['WStsD']['Sl'] = 6;
            // uparams['WStsD']['Cl'] = 6;
            // uparams['WStsD']['El'] = 3;
            // uparams['WStsD']['Ht'] = 6;
            // uparams['WStsD']['Tx'] = 8;
            // uparams['WStsD']['Bl'] = 0;
            // uparams['WStsD']['Cr'] = 0;
            // uparams['WStsD']['Gs'] = 8;
            // uparams['WStsD']['Mg'] = 4;
            // uparams['WStsD']['Rd'] = 12;
            // uparams['WStsD']['Vr'] = 6;
            // uparams['WStsD']['Vd'] = 3;
            // uparams['WStsD']['Ab'] = 0;
            uparams['MStsD'] = mulArrScl(uparams['WStsD'],uparams['StsDFactr']);
            uparams['WStsT'] = [];
            uparams['MStsT'] = [];
            for (elemType in uparams['MStsD'])
            {
                uparams['WStsT'][elemType] = Math.max(0,Math.floor(uparams['WStsD'][elemType])+1);
                uparams['MStsT'][elemType] = Math.max(0,Math.floor(uparams['MStsD'][elemType])+1);
            }
            // console.log(uparams['MStsT']);
            
            uparams['MDmgCrt'] = mulArrScl(ShotDXXX, uparams['MCrtFactr']);
            uparams['MDmgCrtSum'] = sumArrRed(uparams['MDmgCrt']);
            uparams['MStDm']['Im'] = 0;
            uparams['MStDm']['Pn'] = 0;
            uparams['MStDm']['Sl'] = 0.35 * uparams['MDmgCrtSum'];
            uparams['MStDm']['Cl'] = 0;
            uparams['MStDm']['El'] = 1.00 * uparams['MDmgCrtSum'] * (1+uparams['ElemBonus']['El'])/2;
            uparams['MStDm']['Ht'] = 0.50 * uparams['MDmgCrtSum'] * (1+uparams['ElemBonus']['Ht'])/2;
            uparams['MStDm']['Tx'] = 1.00 * uparams['MDmgCrtSum'] * (1+uparams['ElemBonus']['Tx'])/2;
            uparams['MStDm']['Bl'] = 0;
            uparams['MStDm']['Cr'] = 0;
            uparams['MStDm']['Gs'] = 1.00 * uparams['MDmgCrtSum'] * Math.pow((1+uparams['ElemBonus']['Tx'])/2,2);
            uparams['MStDm']['Mg'] = 0;
            uparams['MStDm']['Rd'] = 0;
            uparams['MStDm']['Vr'] = 0;
            uparams['MStDm']['Vd'] = 0;
            uparams['MStDm']['Ab'] = 0;
            
            //fire rate
            uparams['RateBonus'] = uparams['ModFR']/100;
            uparams['RateFactr'] = 1+uparams['RateBonus'];
            
            uparams['MRate'] = Math.max(uparams['WepFR']*uparams['RateFactr'],1/60);
            uparams['RateFactr'] = uparams['MRate']/uparams['WepFR'];
            
            //magazine
            uparams['WMagShots'] = Math.floor(uparams['WepMag']/uparams['WepCons']);
            //uparams['WMagShots'] = animated ? uparams['WepMag']/uparams['WepCons'] : Math.floor(uparams['WepMag']/uparams['WepCons']);
            uparams['MMag'] = uparams['WepMag'] * (1+uparams['ModMag']/100);
            uparams['MMagShots'] = Math.floor(uparams['MMag']/uparams['WepCons']);
            //uparams['MMagShots'] = animated ? uparams['MMag']/uparams['WepCons'] : Math.floor(uparams['MMag']/uparams['WepCons']);
            uparams['MReload'] = uparams['WepReload'] / (1+uparams['ModReload']/100);
            
            
            uparams['WMagTime'] = uparams['WMagShots'] / uparams['WepFR'];
            uparams['WCycleTime'] = uparams['WMagTime'] + uparams['WepReload'];
            uparams['WTimeScroll'] = uparams['WTimeScroll'] * oldWFR / uparams['WepFR'];
            uparams['WTimeScroll'] = uparams['WTimeScroll'] % uparams['WCycleTime'];
            uparams['WTimeScroll'] = uparams['WTimeScroll'] > uparams['WMagTime'] ? uparams['WTimeScroll'] - uparams['WCycleTime'] : uparams['WTimeScroll'];
            uparams['MMagTime'] = uparams['MMagShots'] / uparams['MRate'];
            uparams['MCycleTime'] = uparams['MMagTime'] + uparams['MReload'];
            uparams['MTimeScroll'] = uparams['MTimeScroll'] * oldMFR / uparams['MRate'];
            uparams['MTimeScroll'] = uparams['MTimeScroll'] % uparams['MCycleTime'];
            uparams['MTimeScroll'] = uparams['MTimeScroll'] > uparams['MMagTime'] ? uparams['MTimeScroll'] - uparams['MCycleTime'] : uparams['MTimeScroll'];
            
            uparams['WDPS'] = mulArrScl(uparams['WShot'],uparams['WepFR']);
            uparams['WDPSSum'] = sumArrRed(uparams['WDPS']);
            uparams['MDPS'] = mulArrScl(uparams['MShot'],uparams['MRate']);
            uparams['MDPSSum'] = sumArrRed(uparams['MDPS']);
            uparams['IDPSSum'] = uparams['MDPSSum'] / uparams['WDPSSum'];
            uparams['WSDPS'] = mulArrScl(uparams['WDPS'], uparams['WMagTime']/uparams['WCycleTime']);
            uparams['WSDPSSum'] = sumArrRed(uparams['WSDPS']);
            uparams['MSDPS'] = mulArrScl(uparams['MDPS'], uparams['MMagTime']/uparams['MCycleTime']);
            uparams['MSDPSSum'] = sumArrRed(uparams['MSDPS']);
            uparams['ISDPSSum'] = uparams['MSDPSSum'] / uparams['WSDPSSum'];
        }
        
        function showDPS(uparams,scrollOnly)
        {
            var baseDamageDim;
            var modDamageWidth;
            var modElementalWidth;
            var modElementalDepth;
            var modMultishotHeight;
            var modMultishotDepth;
            var weaponCritWidth;
            var weaponCritHeight;
            var moddedCritWidth;
            var moddedCritHeight;
            
            var moddedStatusDim;
            var moddedStatusDamageDim = [];
            var moddedStsCDispVal;
            
            var rateBaseWidth;
            var rateBaseDepth;
            var rateBaseHeight;
            var rateModWidth;
            var rateModDepth;
            var rateModHeight;
            
            var WCrtBorderColor = 'black';
            var MCrtBorderColor = 'black';
            
            //calculateDPS(uparams);
            
            var azimuthMod = viewAzimuth % Math.PI*2;
            
            var MNBars = Math.ceil(uparams['ModPellets']);
            
            var RB = 1/8;
            var RS = uparams['RShot']
            
            var TDispStart = -1;
            var TDispEnd = DPSTimeRange + 1;
            
            var WMagShots = Math.round(uparams['WMagShots']);
            
            var WFirstShot = Math.ceil(TDispStart/uparams['WCycleTime'])*WMagShots + Math.max(Math.floor(TDispStart%uparams['WCycleTime']*uparams['WepFR']),-WMagShots);
            var WLastShot = Math.floor(TDispEnd/uparams['WCycleTime'])*WMagShots + Math.min(Math.ceil(TDispEnd%uparams['WCycleTime']*uparams['WepFR']),WMagShots);
            
            var WNumShots = WLastShot - WFirstShot + 1;
            WNumShots = WMagShots < 1 ? 0 : WNumShots;
            
            var WTOffset = uparams['WTimeScroll'] % uparams['WCycleTime'];
            WTOffset = WTOffset > uparams['WMagTime'] ? WTOffset - uparams['WCycleTime'] : WTOffset;
            var WShotOffset = Math.ceil(WTOffset*uparams['WepFR']);
            WShotOffset = Math.max(WShotOffset,0);
            
            var MMagShots = Math.round(uparams['MMagShots']);
            
            var MFirstShot = Math.ceil(TDispStart/uparams['MCycleTime'])*MMagShots + Math.max(Math.floor(TDispStart%uparams['MCycleTime']*uparams['MRate']),-MMagShots);
            var MLastShot = Math.floor(TDispEnd/uparams['MCycleTime'])*MMagShots + Math.min(Math.ceil(TDispEnd%uparams['MCycleTime']*uparams['MRate']),MMagShots);
            
            var MNumShots = MLastShot - MFirstShot + 1;
            MNumShots = MMagShots < 1 ? 0 : MNumShots;
            
            var MTOffset = uparams['MTimeScroll'] % uparams['MCycleTime'];
            MTOffset = MTOffset > uparams['MMagTime'] ? MTOffset - uparams['MCycleTime'] : MTOffset;
            var MShotOffset = Math.ceil(MTOffset*uparams['MRate']);
            MShotOffset = Math.max(MShotOffset,0);
            
            //console.log(uparams['WDPS']);
            //console.log(uparams['MDPS']);
            
            baseDamageDim = Math.pow(uparams['WepDamageSum'],1/3.);
            modDamageWidth = baseDamageDim * uparams['DmgeBonus'];
            modElementalWidth = baseDamageDim * uparams['DmgeFactr'];
            modElementalDepth = baseDamageDim * uparams['ElemBonusSum'];
            modMultishotHeight = baseDamageDim * uparams['MultBonus'];
            modMultishotDepth = baseDamageDim * uparams['ElemFactrSum'];
            weaponCritHeight = baseDamageDim * uparams['MultFactr'] * uparams['WCrtProbl'];
            weaponCritWidth = modElementalWidth * uparams['WCrtBonus'];
            moddedCritHeight = baseDamageDim * uparams['MultFactr'] * uparams['MCrtProbl'];
            moddedCritWidth = modElementalWidth * uparams['MCrtBonus'];
            
            rateBaseHeight = Math.pow(uparams['WShotSum'],1/3.);
            rateBaseWidth = rateBaseHeight;
            rateBaseDepth = rateBaseHeight;
            
            //solve {x*y=z, (x-1)*r=(y-1)} for x,y
            rateModWidth = (Math.pow(RB*RB + RB*(4*uparams['RShotSum'] - 2) + 1,1/2) + RB - 1)/(2*RB) * rateBaseHeight;
            rateModHeight  = (Math.pow(RB*RB + RB*(4*uparams['RShotSum'] - 2) + 1,1/2) - RB + 1)/2;
            rateModHeight = Math.pow(rateModHeight,1/2) * rateBaseHeight;
            rateModDepth = rateModHeight;
            
            var sr = 1/uparams['RateScale'];
            
            /*
            var WNRows = Math.min(Math.ceil(rateBaseWidth/4*uparams['RateScale']*uparams['WepFR']),WMagShots);
            
            for (var i = weaponRateDispBoxes.length-1; i >= WNumShots && i >= 1; i--)
            {
                weaponRateDispBoxes.pop().removeParent();
            }
            
            for (var i = 0; i < WNumShots; i++)
            {
                if (i >= weaponRateDispBoxes.length)
                {
                    i = weaponRateDispBoxes.push(new box(i.toString().padStart(4,'0000')+idStr,'DPSMiniBase','baseDisp',-1,false, 0))-1;
                    //console.log(i,weaponRateDispBoxes[i]);
                    weaponRateDispBoxes[i].setParent(DOMDPSRateDispOrigin);
                }
                
                var xI = i + WFirstShot;
                
                //1 second = 4em
                var shotNo = xI+WShotOffset;
                var magNo = Math.floor(shotNo/WMagShots);
                shotNo = shotNo % WMagShots;
                shotNo = shotNo < 0 ? shotNo + WMagShots : shotNo;
                var rowNo = Math.round(shotNo % WNRows);
                var xT = magNo * uparams['WCycleTime'] + shotNo / uparams['WepFR'] - WTOffset;
                var xP = xT*4*sr
                var opacity = 1;
                var sideColor = 'rgba(223,223,223,0.25)';
                if (xT < 0)
                {
                    sideColor = 'rgb(127,0,0)';
                    opacity = Math.max(1+xT,0);
                }
                else if (xT >= DPSTimeRange)
                {
                    opacity *= Math.max(DPSTimeRange+1-xT,0);
                }
                
                if (azimuthMod < Math.PI)
                {
                    weaponRateDispBoxes[i].DOMBox.style.zIndex = xI - Math.floor(rowNo/WNRows*WNumShots) + 5000;
                }
                else
                {
                    weaponRateDispBoxes[i].DOMBox.style.zIndex = -xI + Math.floor(rowNo/WNRows*WNumShots)+ 5000;
                }
                
                if (xT < -1 || xT > DPSTimeRange + 1)
                {
                    weaponRateDispBoxes[i].DOMBox.style.visibility = 'hidden';
                }
                else
                {
                    weaponRateDispBoxes[i].setTransform(xP,0,-rowNo*rateBaseDepth,rateBaseWidth,rateBaseHeight,rateBaseDepth,viewAzimuth,viewAltitude,uparams['RateScale']);
                    weaponRateDispBoxes[i].setSideColor(sideColor);
                    weaponRateDispBoxes[i].DOMBox.style.opacity = opacity;
                    weaponRateDispBoxes[i].DOMBox.style.visibility = 'visible';
                }
            }
            */
            
            var MNRows = Math.min(Math.ceil(rateModHeight/4*uparams['RateScale']*uparams['MRate']),MMagShots);
            //var MNRows = Math.ceil(rateModWidth/4*uparams['RateScale']*uparams['MRate']);
            
            var MRateShift = -Math.max(0,MNRows*rateModHeight*0.6-10*sr);
            
            for (var i = moddedRateDispBoxes.length-1; i >= MNumShots && i >= 1; i--)
            {
                moddedRateDispBoxes.pop().removeParent();
            }
            
            for (var i = 0; i < MNumShots; i++)
            {
                if (i >= moddedRateDispBoxes.length)
                {
                    i = moddedRateDispBoxes.push(new box(i.toString().padStart(4,'0000')+idStr,'DPSMiniBase','rateDisp',-1,false, 0))-1;
                    moddedRateDispBoxes[i].setParent(DOMDPSRateDispOrigin);
                }
                
                var xI = i + MFirstShot;
                
                var shotNo = xI+MShotOffset;
                var magNo = Math.floor(shotNo/MMagShots);
                shotNo = shotNo % MMagShots;
                shotNo = shotNo < 0 ? shotNo + MMagShots : shotNo;
                var rowNo = Math.round(shotNo % MNRows);
                var DT = magNo * uparams['MCycleTime'] + shotNo / uparams['MRate'] - MTOffset;
                var DP = DT*4*sr;
                var opacity = 1-Math.exp(-0.05*Math.min(rateModWidth,rateModHeight));
                // var borderColor = 'rgba(0,0,0,'+opacity+')';
                var borderColor = 'black';
                var sideColor = 'grey';
                if (DT < 0)
                {
                    borderColor = 'transparent';
                    opacity = Math.max(1+DT,0);
                    // sideColor = 'rgba(255,0,0,'+opacity+')';
                    sideColor = 'rgb(255,0,0)';
                }
                else 
                {
                    if (DT >= DPSTimeRange)
                    {
                        opacity *= Math.max(DPSTimeRange+1-DT,0);
                    }
                    // sideColor = 'rgba(127,127,127,'+opacity+')';
                    sideColor = 'rgb(127,127,127)';
                }
                
                if (azimuthMod < Math.PI)
                {
                    moddedRateDispBoxes[i].DOMBox.style.zIndex = xI - Math.floor(rowNo/MNRows*MNumShots);
                }
                else
                {
                    moddedRateDispBoxes[i].DOMBox.style.zIndex = -xI + Math.floor(rowNo/MNRows*MNumShots);;
                }
                
                if (DT < -1 || DT > DPSTimeRange + 1)
                {
                    //moddedRateDispBoxes[i].DOMBox.style.display = 'none';
                    moddedRateDispBoxes[i].DOMBox.style.visibility = 'hidden';
                }
                else
                {
                    moddedRateDispBoxes[i].setTransform(-rateModWidth+MRateShift,-DP,-rowNo*rateModDepth,rateModWidth,rateModHeight,rateModDepth,viewAzimuth,viewAltitude,uparams['RateScale']);
                    moddedRateDispBoxes[i].setSideColor(sideColor);
                    moddedRateDispBoxes[i].setBorderColor(borderColor);
                    moddedRateDispBoxes[i].DOMBox.style.opacity = opacity;
                    //moddedRateDispBoxes[i].DOMBox.style.display = 'block';
                    moddedRateDispBoxes[i].DOMBox.style.visibility = 'visible';
                }
            }
            
            rateTimeAxis.setTransform(MRateShift,-4*TDispStart*sr,0,0.25*sr,4*(TDispEnd-TDispStart+8)*sr,[0,-1,0],[-1,0,0],-uparams['MTimeScroll'],viewAzimuth,viewAltitude,uparams['RateScale']);
            
            if (!scrollOnly)
            {
                shotDispBoxes['DPSBase'].setTransform(0,0,0,baseDamageDim,baseDamageDim,baseDamageDim,viewAzimuth,viewAltitude,uparams['ShotScale']);
                
                shotDispBoxes['DPSDmge'].setTransform(baseDamageDim,0,0,modDamageWidth,baseDamageDim,baseDamageDim,viewAzimuth,viewAltitude,uparams['ShotScale']);
                //shotDispBoxes['DPSDmge'].DOMBox.style.opacity = Math.abs(uparams['DmgeBonus']) > 0.1 ? 1 : Math.abs(uparams['DmgeBonus'])*10;
                
                shotDispBoxes['DPSElem'].setTransform(0,0,-baseDamageDim,modElementalWidth,baseDamageDim,modElementalDepth,viewAzimuth,viewAltitude,uparams['ShotScale']);
                //shotDispBoxes['DPSElem'].DOMBox.style.opacity = Math.abs(uparams['ElemBonus']) > 0.1 ? 1 : Math.abs(uparams['ElemBonus'])*10;
                
                shotDispBoxes['DPSMult'].setTransform(0,modMultishotHeight,0,modElementalWidth,modMultishotHeight,modMultishotDepth,viewAzimuth,viewAltitude,uparams['ShotScale']);
                //shotDispBoxes['DPSMult'].DOMBox.style.opacity = Math.abs(uparams['MultBonus']) > 0.1 ? 1 : Math.abs(uparams['MultBonus'])*10;
                
                shotDispBoxes['DPSWCrt'].setTransform(modElementalWidth,modMultishotHeight*uparams['WCrtProbl'],0,weaponCritWidth,weaponCritHeight,modMultishotDepth,viewAzimuth,viewAltitude,uparams['ShotScale']);
                if (uparams['WCrtProbl'] > 2) {WCrtBorderColor = 'darkred';}
                else if (uparams['WCrtProbl'] > 1) {WCrtBorderColor = 'darkorange';}
                shotDispBoxes['DPSWCrt'].setBorderColor(WCrtBorderColor)
                //shotDispBoxes['DPSWCrt'].DOMBox.style.opacity = Math.abs(uparams['WCrtProbl']) > 0.1 ? 1 : Math.abs(uparams['WCrtProbl'])*10;
                
                shotDispBoxes['DPSMCrt'].setTransform(modElementalWidth,modMultishotHeight*uparams['MCrtProbl'],0,moddedCritWidth,moddedCritHeight,modMultishotDepth,viewAzimuth,viewAltitude,uparams['ShotScale']);
                if (uparams['MCrtProbl'] > 2) {MCrtBorderColor = 'darkred';}
                else if (uparams['MCrtProbl'] > 1) {MCrtBorderColor = 'darkorange';}
                shotDispBoxes['DPSMCrt'].setBorderColor(MCrtBorderColor)
                //shotDispBoxes['DPSMCrt'].DOMBox.style.opacity = Math.abs(uparams['MCrtProbl']) > 0.1 ? 1 : Math.abs(uparams['MCrtProbl'])*10;
                
                shotDispBoxes['DPSCDmg'].setTransform(modElementalWidth,modMultishotHeight,0,moddedCritWidth,baseDamageDim*uparams['MultFactr'],modMultishotDepth,viewAzimuth,viewAltitude,uparams['ShotScale']);
                
                rateFireAxis.setTransform(MRateShift,0,2*sr,50*sr,(MNRows)*rateModHeight+4*sr,[0,0,-1],[1,0,0],0,viewAzimuth,viewAltitude,uparams['RateScale']);
                
                // shotDispBoxes['DPSWCrt'].setTransform(0,0,weaponCritDepth,weaponCritWidth,modMultishotHeight,weaponCritDepth,viewAzimuth,viewAltitude,uparams['ShotScale']);
                // //shotDispBoxes['DPSWCrt'].DOMBox.style.opacity = 
                
                // shotDispBoxes['DPSMCrt'].setTransform(0,0,moddedCritDepth,moddedCritWidth,modMultishotHeight,moddedCritDepth,viewAzimuth,viewAltitude,uparams['ShotScale']);
                // //shotDispBoxes['DPSMCrt'].DOMBox.style.opacity = 
                
                var accumProb = 0;
                var s = 1/uparams['SttsScale']
                var u = 1*s;
                var h = 4;
                var srt = 20/h;
                var split = uparams['ModPellets'] + 1 - MNBars;
                var gx = 5;
                var gz = 0;
                var my = 12;//Math.min(uparams['ModPellets'],18)
                
                moddedSttGraphSVG.plot(uparams['ModPellets'],uparams['WepPellets']);
                // moddedSttGraphLabel.setTransform(0,0,uparams['MStsC']*8*h*u,0,0,[0,0,-1],[1,0,0],viewAzimuth,viewAltitude,uparams['SttsScale']);
                // moddedSttGraphAxis.setTransform(0,8*u,uparams['MStsC']*8*h*u,1,8*h*u+1,[0,0,-1],[1,0,0],0,viewAzimuth,viewAltitude,uparams['SttsScale']);
                moddedSttGraphLabel.setTransform(   gx,-h*s,gz,
                                                    0,0,[1,0,0],[0,0,1],
                                                    viewAzimuth,viewAltitude,uparams['SttsScale']);
                moddedSttGraphAxis.setTransform(    gx,0,gz,
                                                    0.5,srt*h*s+1,[1,0,0],[0,0,1],0,
                                                    viewAzimuth,viewAltitude,uparams['SttsScale']);
                
                for (var i = moddedSttsDispBoxes.length-1; i >= MNBars+1 && i >= 1; i--)
                {
                    moddedSttsDispBoxes.pop().removeParent();
                    moddedSttsOutlBoxes.pop().removeParent();
                }
                
                //console.log(split);
                for (var i = 0; i < MNBars+1; i++)
                {
                    if (i >= moddedSttsDispBoxes.length)
                    {
                        i = moddedSttsDispBoxes.push(new box(i.toString().padStart(4,'0000')+idStr,'DPSSttsProbBar','sttsDisp',-1,false, 0))-1;
                        moddedSttsOutlBoxes.push(new box(i.toString().padStart(4,'0000')+idStr,'DPSSttsProbBar','stslDisp',1000,false, 0));
                        // moddedSttsOutlBoxes[i].DOMBox.style.opacity = 0.5;
                        // moddedSttsDispBoxes[i].setSideColor('rgb('+colorScale[k]+')');
                        moddedSttsOutlBoxes[i].setSideColor(i==1?'':(i*2>=100?'rgba(0,0,0,0.3)':'rgba('+colorScale[i*2+1]+',0.3)'));
                        // moddedSttsOutlBoxes[i].setBorderColor(i==1?'':(i*2>=100?'black':'rgb('+colorScale[i*2+1]+')'));
                        if (i==0)
                        {
                            moddedSttsDispBoxes[i].setParent(DOMDPSSttGraphOrigin);
                            moddedSttsOutlBoxes[i].setParent(DOMDPSSttGraphOrigin);
                        }
                        else
                        {
                            moddedSttsDispBoxes[i].setParent(DOMDPSSttsDispOrigin);
                            moddedSttsOutlBoxes[i].setParent(DOMDPSSttsDispOrigin);
                        }
                    }
                    
                    if (i==0)
                    {
                        moddedSttsDispBoxes[i].DOMBox.style.zIndex = 2000;
                        moddedSttsOutlBoxes[i].DOMBox.style.zIndex = 2000;
                    }
                    else
                    {
                        moddedSttsDispBoxes[i].DOMBox.style.zIndex = 1000 + i;
                        moddedSttsOutlBoxes[i].DOMBox.style.zIndex = 0 + i;
                    }
                    
                    var prob1 = binCalc(uparams['MStsP'],MNBars,i) * split;
                    var prob2 = i < MNBars ? binCalc(uparams['MStsP'],MNBars-1,i) * (1-split) : 0;
                    var prob = prob1+prob2;
                    accumProb += prob;
                    //console.log(i,uparams['MStsP'],MNBars,binCalc(uparams['MStsP'],MNBars,i),binCalc(uparams['MStsP'],MNBars-1,i),prob1,prob2);
                    
                    if (i == 0)
                    {
                        // moddedSttsDispBoxes[i].DOMBox.style.visibility = 'hidden';
                        moddedSttsDispBoxes[i].setBorderColor('rgba(127,79,64,0.5)');
                        // moddedSttsOutlBoxes[i].DOMBox.style.visibility = 'hidden';
                        moddedSttsDispBoxes[i].setTransform(    gx,gz-h*s*uparams['MStsP']+0.5,0,
                                                                h*s*srt+10,0.01,0.01,
                                                                viewAzimuth,viewAltitude,uparams['SttsScale']);
                        moddedSttsDispLabel[0].setTransform(    gx+srt*h*s+1,gz-h*s*uparams['MStsP']+1,0,
                                                                0,0,[1,0,0],[0,0,1],
                                                                viewAzimuth,viewAltitude,uparams['SttsScale']);
                        moddedSttsOutlBoxes[i].setTransform(    gx,gz-h*s*(1-accumProb),0,
                                                                h*s*srt+10,0.01,0.01,
                                                                viewAzimuth,viewAltitude,uparams['SttsScale']);
                        moddedSttsDispLabel[1].setTransform(    gx+srt*h*s+1,gz-h*s*(1-accumProb)-7,0,
                                                                0,0,[1,0,0],[0,0,1],
                                                                viewAzimuth,viewAltitude,uparams['SttsScale']);
                        // var decPlaces = Math.max(MNBars*0.5,Math.ceil(-Math.log10(prob)));
                        var decPlaces = Math.ceil(-Math.log10(prob));
                        decPlaces = prob == 0 ? 0 : Math.min(Math.max(1,decPlaces),14)
                        // var moddedStsCDispVal = (100-prob*100).toFixed(Math.min(Math.max(4,decPlaces),14));
                        var moddedStsPDispVal = (uparams['MStsP']*100).toFixed(decPlaces);
                        var moddedStsCDispVal = (100-prob*100).toFixed(decPlaces);
                        if (prob != 0)
                        {
                            if (moddedStsPDispVal.startsWith('100'))
                            {
                                moddedStsPDispVal = '099.99999999999999'
                            }
                            else
                            {
                                moddedStsPDispVal = '0' + moddedStsPDispVal
                            }
                        }
                        if (prob != 0)
                        {
                            if (moddedStsCDispVal.startsWith('100'))
                            {
                                moddedStsCDispVal = '099.99999999999999'
                            }
                            else
                            {
                                moddedStsCDispVal = '0' + moddedStsCDispVal
                            }
                        }
                        moddedSttsDispLabel[0].setContents('Per pellet ~ '+moddedStsPDispVal+'%');
                        moddedSttsDispLabel[1].setContents('At least one ~ '+moddedStsCDispVal+'%');
                    }
                    else
                    {
                        moddedSttsDispBoxes[i].setTransform(    gx+uparams['MStsC']*srt*h*s,(accumProb-1)*h*s,gz,
                                                                0.0,h*prob*s,i*u,
                                                                viewAzimuth,viewAltitude,uparams['SttsScale']);
                        moddedSttsOutlBoxes[i].setTransform(    gx+uparams['MStsC']*srt*h*s,0,gz-(i-1)*u,
                                                                0.0,(i<MNBars?1:split)*h*s,u,
                                                                viewAzimuth,viewAltitude,uparams['SttsScale']);
                    }
                    //moddedSttsDispBoxes[i].DOMBox.style.opacity = Math.min(1,prob*100);
                    //moddedSttsDispBoxes[i].setSideColor(colorScale[i]);
                    
                    /*
                    if (i <= Math.round(MNBars - uparams['WepPellets']))
                    {
                        moddedSttsDispBoxes[i].setSideColor('rgba(0  ,111,223,1)');
                    }
                    else
                    {
                        moddedSttsDispBoxes[i].setSideColor('');
                    }
                    */
                    
                    if (i > Math.ceil(uparams['WepPellets']))
                    {
                        moddedSttsOutlBoxes[i].setBorderColor('rgba(0  ,111,223,0.8)');
                        // moddedSttsOutlBoxes[i].setSideColor('rgba(0  ,111,223,0.5)');
                    }
                    else
                    {
                        moddedSttsOutlBoxes[i].setBorderColor('');
                        // moddedSttsOutlBoxes[i].setSideColor('');
                    }
                }
                //console.log(accumProb);
                
                var i = 0;
                accumProb = 0;
                for (var elemType in moddedStEfDispBoxes)
                {
                    prob = uparams['MStsCProp'][elemType];
                    var stDm = uparams['MStDm'][elemType]*uparams['MStsT'][elemType];
                    if (elemType == 'Gs')
                    {
                        stDm += uparams['MDmgCrtSum'] * (1+uparams['ElemBonus']['Tx'])/2;
                    }
                    else if (elemType == 'El')
                    {
                        stDm = uparams['MStDm'][elemType];
                    }
                    
                    var stDmDim = Math.max(stDm / (u * 3.5*h*s),0.75);
                    // console.log(elemType,stDm,stDmDim);
                    // moddedStEfDispBoxes[elemType].setTransform(0,h*s,-uparams['MStsC']*accumProb*6*h*s,Math.pow(stDm,1/3),Math.pow(stDm,1/3),Math.pow(stDm,1/3),viewAzimuth,viewAltitude,uparams['SttsScale']);
                    if (uparams['ModPellets'] < 4 && uparams['ModPellets']*u < uparams['MStsP']*3.5*h*s)
                    {
                        moddedStEfDispBoxes[elemType].setTransform( 0,(1.75+uparams['MStsP']*(1.5-3.5*accumProb))*h*s,0,
                                                                    stDmDim,uparams['MStsP']*3.5*prob*h*s,uparams['ModPellets']*u,
                                                                    viewAzimuth,viewAltitude,uparams['SttsScale']);
                        moddedStEfDispBoxes[elemType].setZIndex(i);
                    }
                    else
                    {
                        moddedStEfDispBoxes[elemType].setTransform( 0,(1.75+uparams['MStsP']*1.5)*h*s,-uparams['ModPellets']*(accumProb)*u,
                                                                    stDmDim,uparams['MStsP']*3.5*h*s,uparams['ModPellets']*prob*u,
                                                                    viewAzimuth,viewAltitude,uparams['SttsScale']);
                        moddedStEfDispBoxes[elemType].setZIndex(Math.ceil(uparams['ModPellets'])-i);
                    }
                    accumProb += prob;
                    i++;
                }
                
                //rateDispWBox.setTransform(0,rateBaseHeight,0,rateBaseWidth,rateBaseHeight,rateBaseDepth,viewAzimuth,viewAltitude,uparams['RateScale']);
                //rateDispBoxes['modb'].setTransform(0,rateModHeight,0,rateModWidth,rateModHeight,rateModDepth,viewAzimuth,viewAltitude,uparams['RateScale']);
                //rateDispBoxes['modb'].DOMBox.style.opacity = 1-Math.exp(-0.05*rateModWidth);
                //console.log(rateModWidth,Math.exp(-0.08*rateModWidth),rateDispBoxes['modb'].DOMBox.style.opacity);
                
                DOMDPSVals['WepDamageSum'].innerHTML=uparams['WepDamageSum'].toFixed(3);
                DOMDPSVals['RatDamageSum'].innerHTML=uparams['RatDamageSum'].toFixed(3)+'x';
                DOMDPSVals['ModDamageSum'].innerHTML=uparams['ModDamageSum'].toFixed(3);
                // DOMDPSVals['WElemSum'    ].innerHTML='1.000';
                DOMDPSVals['RElemSum'    ].innerHTML=uparams['ElemFactrSum'].toFixed(3)+'x';
                DOMDPSVals['MElemSum'    ].innerHTML=uparams['ElemFactrSum'].toFixed(3);
                // DOMDPSVals['WMultSum'    ].innerHTML='1.000';
                DOMDPSVals['RMultSum'    ].innerHTML=uparams['MultFactr'].toFixed(3)+'x';
                DOMDPSVals['MMultSum'    ].innerHTML=uparams['MultFactr'].toFixed(3);
                DOMDPSVals['WCritSum'    ].innerHTML=uparams['WCrtFactr'].toFixed(3);
                DOMDPSVals['RCritSum'    ].innerHTML=uparams['RCrtFactr'].toFixed(3)+'x';
                DOMDPSVals['MCritSum'    ].innerHTML=uparams['MCrtFactr'].toFixed(3);
                DOMDPSVals['WShotSum'    ].innerHTML=uparams['WShotSum'].toFixed(3);
                DOMDPSVals['RShotSum'    ].innerHTML=uparams['RShotSum'].toFixed(3)+'x';
                DOMDPSVals['MShotSum'    ].innerHTML=uparams['MShotSum'].toFixed(3);
                DOMDPSVals['WStsC'       ].innerHTML=uparams['WStsC'].toFixed(3);
                DOMDPSVals['RStsC'       ].innerHTML=uparams['StsCFactr'].toFixed(3)+'x';
                DOMDPSVals['MStsC'       ].innerHTML=uparams['MStsC'].toFixed(3);
                DOMDPSVals['WStsP'       ].innerHTML=uparams['WStsP'].toFixed(3);
                DOMDPSVals['RStsP'       ].innerHTML=uparams['RStsP'].toFixed(3)+'x';
                DOMDPSVals['MStsP'       ].innerHTML=uparams['MStsP'].toFixed(3);
                DOMDPSVals['WStsM'       ].innerHTML=uparams['WepPellets'].toFixed(3);
                DOMDPSVals['RStsM'       ].innerHTML=uparams['MultFactr'].toFixed(3)+'x';
                DOMDPSVals['MStsM'       ].innerHTML=uparams['ModPellets'].toFixed(3);
                DOMDPSVals['WStts'       ].innerHTML=uparams['WStts'].toFixed(3);
                DOMDPSVals['RStts'       ].innerHTML=uparams['RStts'].toFixed(3)+'x';
                DOMDPSVals['MStts'       ].innerHTML=uparams['MStts'].toFixed(3);
                DOMDPSVals['WStsO'       ].innerHTML=uparams['WStsC'].toFixed(3);
                DOMDPSVals['RStsO'       ].innerHTML=uparams['RStsO'].toFixed(3)+'x';
                DOMDPSVals['MStsO'       ].innerHTML=uparams['MStsO'].toFixed(3);
                DOMDPSVals['WStsA'       ].innerHTML=uparams['WStsC'].toFixed(3);
                DOMDPSVals['RStsA'       ].innerHTML=uparams['RStsA'].toFixed(3)+'x';
                DOMDPSVals['MStsA'       ].innerHTML=uparams['MStsA'].toFixed(3);
                DOMDPSVals['WDPSSum'     ].innerHTML=uparams['WDPSSum'].toFixed(3);
                DOMDPSVals['IDPSSum'     ].innerHTML=uparams['IDPSSum'].toFixed(3)+'x';
                DOMDPSVals['MDPSSum'     ].innerHTML=uparams['MDPSSum'].toFixed(3);
                DOMDPSVals['WSDPSSum'    ].innerHTML=uparams['WSDPSSum'].toFixed(3);
                DOMDPSVals['ISDPSSum'    ].innerHTML=uparams['ISDPSSum'].toFixed(3)+'x';
                DOMDPSVals['MSDPSSum'    ].innerHTML=uparams['MSDPSSum'].toFixed(3);
                var barFactor = 2000;
                DOMDPSBars['WDPSSum' ].style.width = (uparams['WDPSSum']/barFactor).toFixed(5)+'em';
                DOMDPSBars['MDPSSum' ].style.width = (uparams['MDPSSum']/barFactor).toFixed(5)+'em';
                DOMDPSBars['WSDPSSum'].style.width = (uparams['WSDPSSum']/barFactor).toFixed(5)+'em';
                DOMDPSBars['MSDPSSum'].style.width = (uparams['MSDPSSum']/barFactor).toFixed(5)+'em';
            }
            
        }
        
        function animDPS(timeStamp)
        {
            var timeConst = 0.05;
            var t = (timeStamp - animationLastT) / 1000;
            //var aParams = [];
            //var bParams = [];
            
            if (!animationStart)
            {
                animationStart = timeStamp;
            }
            else if (timeStamp - animationStart >= 500)
            {
                /*
                params['WTimeScroll'] = (timeStamp - animationStart - 500)/1000;
                params['MTimeScroll'] = (timeStamp - animationStart - 500)/1000;
                pParams['WTimeScroll'] = (timeStamp - animationStart - 500)/1000;
                pParams['MTimeScroll'] = (timeStamp - animationStart - 500)/1000;
                */
                
                if (transitionOngoing)
                {
                    transitionOngoing = false;
                    var endScrolling = false;
                    if (scrollingEnabled == 0 || (scrollingEnabled == -1 && params['MCycleTime']*1.5 < DPSTimeRange))
                    {
                        endScrolling = true;
                    }
                    else
                    {
                        params['WTimeScroll'] = pParams['WTimeScroll'];
                        params['MTimeScroll'] = pParams['MTimeScroll'];
                    }
                    for (paramName in params)
                    {
                        if (Array.isArray(params[paramName]))
                        {
                            for (elemType in params[paramName])
                            {
                                pParams[paramName][elemType] = params[paramName][elemType];
                                vParams[paramName][elemType] = 0;
                            }
                        }
                        else
                        {
                            pParams[paramName] = params[paramName];
                            vParams[paramName] = 0;
                        }
                    }
                    showDPS(params,false);
                    if (endScrolling)
                    {
                        animationID = null;
                        return;
                    }
                }
                else if (scrollingEnabled == 0 || (scrollingEnabled == -1 && params['MCycleTime']*1.5 < DPSTimeRange))
                {
                    animationID = null;
                    return;
                }
                else
                {
                    params['WTimeScroll'] = params['WTimeScroll'] + t;
                    params['MTimeScroll'] = params['MTimeScroll'] + t;
                    pParams['WTimeScroll'] = params['WTimeScroll'];
                    pParams['MTimeScroll'] = params['MTimeScroll'];
                    showDPS(params,true);
                }
            }
            else
            {
                for (paramName in params)
                {
                    if (Array.isArray(params[paramName]))
                    {
                        for (elemType in params[paramName])
                        {
                            var pos = pParams[paramName][elemType] - params[paramName][elemType];
                            var a = pos;
                            var b = vParams[paramName][elemType] + pos/timeConst;
                            /*
                            if (paramName == 'DmgeBonus') {
                                console.log(pos,pParams[paramName],params[paramName],vParams[paramName],a,b);
                            }
                            */
                            var newPos = (a + b*t) * Math.exp(-t/timeConst);
                            
                            pParams[paramName][elemType] = params[paramName][elemType] + newPos;
                            vParams[paramName][elemType] = (b - (a + b*t)/timeConst) * Math.exp(-t/timeConst);
                        }
                    }
                    else
                    {
                        var pos = pParams[paramName] - params[paramName];
                        var a = pos;
                        var b = vParams[paramName] + pos/timeConst;
                        /*
                        if (paramName == 'DmgeBonus') {
                            console.log(pos,pParams[paramName],params[paramName],vParams[paramName],a,b);
                        }
                        */
                        var newPos = (a + b*t) * Math.exp(-t/timeConst);
                        
                        pParams[paramName] = params[paramName] + newPos;
                        vParams[paramName] = (b - (a + b*t)/timeConst) * Math.exp(-t/timeConst);
                    }
                }
                showDPS(pParams,false);
            }
            animationLastT = timeStamp;
            animationID = window.requestAnimationFrame(animDPS);
        }
        
        this.updateDPS = function(animate)
        {
            var oldWFR = params['WepFR'];
            var oldMFR = params['MRate'];
            oldWFR = oldWFR == null? 1 : oldWFR;
            oldMFR = oldMFR == null? 1 : oldMFR;
            
            calculateDPS(params);
            
            //console.log('.');
            //console.log(pParams['MTimeScroll'], params['MTimeScroll'], params['MCycleTime']);
            pParams['WTimeScroll'] = pParams['WTimeScroll'] * oldWFR / params['WepFR'];
            pParams['MTimeScroll'] = pParams['MTimeScroll'] * oldMFR / params['MRate'];
            //console.log(pParams['MTimeScroll'], params['MTimeScroll'], params['MCycleTime']);
            pParams['WTimeScroll'] = pParams['WTimeScroll'] % params['WCycleTime'];
            pParams['MTimeScroll'] = pParams['MTimeScroll'] % params['MCycleTime'];
            //console.log(pParams['MTimeScroll'], params['MTimeScroll'], params['MCycleTime']);
            pParams['WTimeScroll'] = pParams['WTimeScroll'] > params['WMagTime'] ? pParams['WTimeScroll'] - params['WCycleTime'] : pParams['WTimeScroll'];
            pParams['MTimeScroll'] = pParams['MTimeScroll'] > params['MMagTime'] ? pParams['MTimeScroll'] - params['MCycleTime'] : pParams['MTimeScroll'];
            //console.log(pParams['MTimeScroll'], params['MTimeScroll'], params['MCycleTime']);
            if (scrollingEnabled == 0 || (scrollingEnabled == -1 && params['MCycleTime']*1.5 < DPSTimeRange))
            {
                params['WTimeScroll'] = 0;
                params['MTimeScroll'] = 0;
            }
            
            if (!animate)
            {
                showDPS(params,false);
                return;
            }
            //console.log(animationID);
            if (animationID)
            {
                window.cancelAnimationFrame(animationID);
                animationID = null;
            }
            transitionOngoing = true;
            animationStart = null;
            animationLastT = null;
            animationID = window.requestAnimationFrame(animDPS);
        }
        
        //get html template
        if (typeof DOMTemplate == 'undefined')
        {
            return;
        }
        this.DOMBuild = DOMTemplate.cloneNode(true);
        
        //make a number string for unique id
        idStr = id.toString();
        idStr = '_' + idStr.padStart(2,'00');
        
        //modify id of descendants
        descendantList = this.DOMBuild.querySelectorAll('*');
        
        for (i in descendantList)
        {
            var descendant = descendantList[i];
            if (typeof descendant == 'object')
            {
                descendant.id = descendant.id.replace('_##',idStr);
            }
        }
        
        DOMIDDisp = this.DOMBuild.querySelector('#IDDisp'+idStr);
        DOMIDDisp.innerHTML = id.toString();
        
        DOMParams['WepDamage'        ] = [];
        DOMParams['WepDamage'  ]['Im'] = this.DOMBuild.querySelector('#iWeaponImDamage'    +idStr);
        DOMParams['WepDamage'  ]['Pn'] = this.DOMBuild.querySelector('#iWeaponPnDamage'    +idStr);
        DOMParams['WepDamage'  ]['Sl'] = this.DOMBuild.querySelector('#iWeaponSlDamage'    +idStr);
        DOMParams['WepDamage'  ]['Cl'] = this.DOMBuild.querySelector('#iWeaponClDamage'    +idStr);
        DOMParams['WepDamage'  ]['El'] = this.DOMBuild.querySelector('#iWeaponElDamage'    +idStr);
        DOMParams['WepDamage'  ]['Ht'] = this.DOMBuild.querySelector('#iWeaponHtDamage'    +idStr);
        DOMParams['WepDamage'  ]['Tx'] = this.DOMBuild.querySelector('#iWeaponTxDamage'    +idStr);
        DOMParams['WepDamage'  ]['Bl'] = this.DOMBuild.querySelector('#iWeaponBlDamage'    +idStr);
        DOMParams['WepDamage'  ]['Cr'] = this.DOMBuild.querySelector('#iWeaponCrDamage'    +idStr);
        DOMParams['WepDamage'  ]['Gs'] = this.DOMBuild.querySelector('#iWeaponGsDamage'    +idStr);
        DOMParams['WepDamage'  ]['Mg'] = this.DOMBuild.querySelector('#iWeaponMgDamage'    +idStr);
        DOMParams['WepDamage'  ]['Rd'] = this.DOMBuild.querySelector('#iWeaponRdDamage'    +idStr);
        DOMParams['WepDamage'  ]['Vr'] = this.DOMBuild.querySelector('#iWeaponVrDamage'    +idStr);
        DOMParams['WepDamage'  ]['Vd'] = this.DOMBuild.querySelector('#iWeaponVdDamage'    +idStr);
        DOMParams['WepDamage'  ]['Ab'] = this.DOMBuild.querySelector('#iWeaponAbDamage'    +idStr);
        DOMParams['WepPellets'       ] = this.DOMBuild.querySelector('#iWeaponPellets'     +idStr);
        DOMParams['WepCC'            ] = this.DOMBuild.querySelector('#iWeaponCC'          +idStr);
        DOMParams['WepCD'            ] = this.DOMBuild.querySelector('#iWeaponCD'          +idStr);
        DOMParams['WepSC'            ] = this.DOMBuild.querySelector('#iWeaponSC'          +idStr);
        DOMParams['WepFR'            ] = this.DOMBuild.querySelector('#iWeaponFR'          +idStr);
        DOMParams['WepCons'          ] = this.DOMBuild.querySelector('#iWeaponCons'        +idStr);
        DOMParams['WepMag'           ] = this.DOMBuild.querySelector('#iWeaponMag'         +idStr);
        DOMParams['WepReload'        ] = this.DOMBuild.querySelector('#iWeaponReload'      +idStr);
        
        DOMParams['ModDamage'          ] = this.DOMBuild.querySelector('#iModBaseDamage'     +idStr);
        DOMParams['ModElemental'       ] = [];
        DOMParams['ModElemental' ]['Im'] = this.DOMBuild.querySelector('#iModImDamage'       +idStr);
        DOMParams['ModElemental' ]['Pn'] = this.DOMBuild.querySelector('#iModPnDamage'       +idStr);
        DOMParams['ModElemental' ]['Sl'] = this.DOMBuild.querySelector('#iModSlDamage'       +idStr);
        DOMParams['ModElemental' ]['Cl'] = this.DOMBuild.querySelector('#iModClDamage'       +idStr);
        DOMParams['ModElemental' ]['El'] = this.DOMBuild.querySelector('#iModElDamage'       +idStr);
        DOMParams['ModElemental' ]['Ht'] = this.DOMBuild.querySelector('#iModHtDamage'       +idStr);
        DOMParams['ModElemental' ]['Tx'] = this.DOMBuild.querySelector('#iModTxDamage'       +idStr);
        DOMParams['ModElemental' ]['Bl'] = this.DOMBuild.querySelector('#iModBlDamage'       +idStr);
        DOMParams['ModElemental' ]['Cr'] = this.DOMBuild.querySelector('#iModCrDamage'       +idStr);
        DOMParams['ModElemental' ]['Gs'] = this.DOMBuild.querySelector('#iModGsDamage'       +idStr);
        DOMParams['ModElemental' ]['Mg'] = this.DOMBuild.querySelector('#iModMgDamage'       +idStr);
        DOMParams['ModElemental' ]['Rd'] = this.DOMBuild.querySelector('#iModRdDamage'       +idStr);
        DOMParams['ModElemental' ]['Vr'] = this.DOMBuild.querySelector('#iModVrDamage'       +idStr);
        DOMParams['ModElemental' ]['Vd'] = this.DOMBuild.querySelector('#iModVdDamage'       +idStr);
        DOMParams['ModElemental' ]['Ab'] = this.DOMBuild.querySelector('#iModAbDamage'       +idStr);
        DOMParams['ModMultishot'       ] = this.DOMBuild.querySelector('#iModMultishot'      +idStr);
        DOMParams['ModCC'              ] = this.DOMBuild.querySelector('#iModCC'             +idStr);
        DOMParams['ModCD'              ] = this.DOMBuild.querySelector('#iModCD'             +idStr);
        DOMParams['ModSC'              ] = this.DOMBuild.querySelector('#iModSC'             +idStr);
        DOMParams['ModSD'              ] = this.DOMBuild.querySelector('#iModSD'             +idStr);
        DOMParams['ModFR'              ] = this.DOMBuild.querySelector('#iModFR'             +idStr);
        DOMParams['ModMag'             ] = this.DOMBuild.querySelector('#iModMag'            +idStr);
        DOMParams['ModReload'          ] = this.DOMBuild.querySelector('#iModReload'         +idStr);
        
        DOMWepForm = this.DOMBuild.querySelector('#weaponForm'+idStr);
        DOMModForm = this.DOMBuild.querySelector('#modForm'+idStr);
        
        //construct graphics
        DOMDPSDisp = this.DOMBuild.querySelector('#dpsDisp'+idStr);
        DOMDPSVals['WepDamageSum'] = DOMDPSDisp.querySelector('#WDmgeVal'+idStr);
        DOMDPSVals['RatDamageSum'] = DOMDPSDisp.querySelector('#RDmgeVal'+idStr);
        DOMDPSVals['ModDamageSum'] = DOMDPSDisp.querySelector('#MDmgeVal'+idStr);
        DOMDPSVals['WElemSum'    ] = DOMDPSDisp.querySelector('#WElemVal'+idStr);
        DOMDPSVals['RElemSum'    ] = DOMDPSDisp.querySelector('#RElemVal'+idStr);
        DOMDPSVals['MElemSum'    ] = DOMDPSDisp.querySelector('#MElemVal'+idStr);
        DOMDPSVals['WMultSum'    ] = DOMDPSDisp.querySelector('#WMultVal'+idStr);
        DOMDPSVals['RMultSum'    ] = DOMDPSDisp.querySelector('#RMultVal'+idStr);
        DOMDPSVals['MMultSum'    ] = DOMDPSDisp.querySelector('#MMultVal'+idStr);
        DOMDPSVals['WCritSum'    ] = DOMDPSDisp.querySelector('#WCritVal'+idStr);
        DOMDPSVals['RCritSum'    ] = DOMDPSDisp.querySelector('#RCritVal'+idStr);
        DOMDPSVals['MCritSum'    ] = DOMDPSDisp.querySelector('#MCritVal'+idStr);
        DOMDPSVals['WShotSum'    ] = DOMDPSDisp.querySelector('#WShotVal'+idStr);
        DOMDPSVals['RShotSum'    ] = DOMDPSDisp.querySelector('#RShotVal'+idStr);
        DOMDPSVals['MShotSum'    ] = DOMDPSDisp.querySelector('#MShotVal'+idStr);
        DOMDPSVals['WStsC'       ] = DOMDPSDisp.querySelector('#WStsCVal'+idStr);
        DOMDPSVals['RStsC'       ] = DOMDPSDisp.querySelector('#RStsCVal'+idStr);
        DOMDPSVals['MStsC'       ] = DOMDPSDisp.querySelector('#MStsCVal'+idStr);
        DOMDPSVals['WStsP'       ] = DOMDPSDisp.querySelector('#WStsPVal'+idStr);
        DOMDPSVals['RStsP'       ] = DOMDPSDisp.querySelector('#RStsPVal'+idStr);
        DOMDPSVals['MStsP'       ] = DOMDPSDisp.querySelector('#MStsPVal'+idStr);
        DOMDPSVals['WStsM'       ] = DOMDPSDisp.querySelector('#WStsMVal'+idStr);
        DOMDPSVals['RStsM'       ] = DOMDPSDisp.querySelector('#RStsMVal'+idStr);
        DOMDPSVals['MStsM'       ] = DOMDPSDisp.querySelector('#MStsMVal'+idStr);
        DOMDPSVals['WStts'       ] = DOMDPSDisp.querySelector('#WSttsVal'+idStr);
        DOMDPSVals['RStts'       ] = DOMDPSDisp.querySelector('#RSttsVal'+idStr);
        DOMDPSVals['MStts'       ] = DOMDPSDisp.querySelector('#MSttsVal'+idStr);
        DOMDPSVals['WStsO'       ] = DOMDPSDisp.querySelector('#WStsOVal'+idStr);
        DOMDPSVals['RStsO'       ] = DOMDPSDisp.querySelector('#RStsOVal'+idStr);
        DOMDPSVals['MStsO'       ] = DOMDPSDisp.querySelector('#MStsOVal'+idStr);
        DOMDPSVals['WStsA'       ] = DOMDPSDisp.querySelector('#WStsAVal'+idStr);
        DOMDPSVals['RStsA'       ] = DOMDPSDisp.querySelector('#RStsAVal'+idStr);
        DOMDPSVals['MStsA'       ] = DOMDPSDisp.querySelector('#MStsAVal'+idStr);
        DOMDPSVals['WDPSSum'     ] = DOMDPSDisp.querySelector('#WDPSVal'+idStr);
        DOMDPSVals['IDPSSum'     ] = DOMDPSDisp.querySelector('#IDPSVal'+idStr);
        DOMDPSVals['MDPSSum'     ] = DOMDPSDisp.querySelector('#MDPSVal'+idStr);
        DOMDPSVals['WSDPSSum'    ] = DOMDPSDisp.querySelector('#WSDPSVal'+idStr);
        DOMDPSVals['ISDPSSum'    ] = DOMDPSDisp.querySelector('#ISDPSVal'+idStr);
        DOMDPSVals['MSDPSSum'    ] = DOMDPSDisp.querySelector('#MSDPSVal'+idStr);
        
        DOMAnimateChangeButton = DOMDPSDisp.querySelector('#bForceAnimate'+idStr);
        
        DOMDPSShotDispOrigin = this.DOMBuild.querySelector('#DPSShotDispOrigin'+idStr);
        DOMDPSStEfDispOrigin = this.DOMBuild.querySelector('#DPSStEfDispOrigin'+idStr);
        DOMDPSSttsDispOrigin = this.DOMBuild.querySelector('#DPSSttsDispOrigin'+idStr);
        DOMDPSSttGraphOrigin = this.DOMBuild.querySelector('#DPSSttGraphOrigin'+idStr);
        DOMDPSRateDispOrigin = this.DOMBuild.querySelector('#DPSRateDispOrigin'+idStr);
        
        shotDispBoxes['DPSBase'] = new box(idStr,'DPSBase','baseDisp', 0,true, DPSDispBaffleDist);
        shotDispBoxes['DPSDmge'] = new box(idStr,'DPSDmge','dmgeDisp', 1,true, DPSDispBaffleDist);
        shotDispBoxes['DPSElem'] = new box(idStr,'DPSElem','elemDisp',-1,true, DPSDispBaffleDist);
        shotDispBoxes['DPSMult'] = new box(idStr,'DPSMult','multDisp',-2,true, DPSDispBaffleDist);
        shotDispBoxes['DPSWCrt'] = new box(idStr,'DPSWCrt','wcrtDisp', 3,true, 0);
        shotDispBoxes['DPSMCrt'] = new box(idStr,'DPSMCrt','mcrtDisp', 4,true, DPSDispBaffleDist);
        shotDispBoxes['DPSCDmg'] = new box(idStr,'DPSCDmg','cdmgDisp', 2,true, 0);
        
        moddedSttsDispLabel[0] = new label(idStr,'DPSSttsText', 'sttsText', 1011);
        moddedSttsDispLabel[1] = new label(idStr,'DPSSttsText', 'sttsText', 1010);
        moddedSttsDispLabel[0].setParent(DOMDPSSttsDispOrigin);
        moddedSttsDispLabel[1].setParent(DOMDPSSttsDispOrigin);
        
        moddedSttGraphLabel = new label(idStr,'DPSSttGraph', 'sttGraph', 1010);
        moddedSttGraphLabel.setParent(DOMDPSSttGraphOrigin);
        moddedSttGraphLabel.setTransform(0,0,0,0,0,[0,0,-1],[1,0,0],viewAzimuth,viewAltitude,params['SttsScale'])
        
        moddedSttGraphAxis = new axis(idStr,'DPSSttGraphAxis','blackAxis',0,20*0.1/params['SttsScale'],1000);
        moddedSttGraphAxis.setParent(DOMDPSSttGraphOrigin);
        
        moddedSttGraphSVG = new binDistPlot();
        moddedSttGraphSVG.plot(1,1);
        moddedSttGraphSVG.setParent(moddedSttGraphLabel.DOMElement);
        
        for (i in elemTypes)
        {
            moddedStEfDispBoxes[elemTypes[i]] = new box(idStr,'DPSStEf'+elemTypes[i],'stefDisp '+elemNames[i],50-i,true,DPSDispBaffleDist);
        }
        
        rateTimeAxis = new axis(idStr,'DPSRateAxis','blackAxis',5001    ,4/params['RateScale'],0);
        rateTimeAxis.setParent(DOMDPSRateDispOrigin);
        
        rateFireAxis = new axis(idStr,'DPSFireAxis','redAxis',  5000    ,0,0);
        rateFireAxis.setParent(DOMDPSRateDispOrigin);
        //rateDispWBox = new box(idStr,'DPSMiniBase','cdmgDisp', 0,true, 5000);
        //rateDispBoxes['modb'] = new box(idStr,'DPSMiniBase','rateDisp',-1, 0);
        
        DOMDPSBars['WDPSSum'] = this.DOMBuild.querySelector('#WDPSBar'+idStr);
        DOMDPSBars['MDPSSum'] = this.DOMBuild.querySelector('#MDPSBar'+idStr);
        DOMDPSBars['WSDPSSum'] = this.DOMBuild.querySelector('#WSDPSBar'+idStr);
        DOMDPSBars['MSDPSSum'] = this.DOMBuild.querySelector('#MSDPSBar'+idStr);
        
        for (var dispItem in shotDispBoxes)
        {
            shotDispBoxes[dispItem].setParent(DOMDPSShotDispOrigin);
        }
        
        for (var elemType in moddedStEfDispBoxes)
        {
            moddedStEfDispBoxes[elemType].setParent(DOMDPSStEfDispOrigin);
        }
        
        //rateDispWBox.setParent(DOMDPSRateDispOrigin);
        
        for (var paramName in DOMParams)
        {
            if (Array.isArray(DOMParams[paramName]))
            {
                params[paramName] = []
                for (var elemType in DOMParams[paramName])
                {
                    DOMParams[paramName][elemType].addEventListener('blur',thisBuild.verifyParamAndCalculate.bind(thisBuild,paramName));
                    params[paramName][elemType] = parseFloat(DOMParams[paramName][elemType].value);
                }
            }
            else
            {
                DOMParams[paramName].addEventListener('blur',thisBuild.verifyParamAndCalculate.bind(thisBuild,paramName));
                params[paramName] = parseFloat(DOMParams[paramName].value);
            }
        }
        
        params['WStsD'] = [];
        params['WStsD']['Im'] = 1;
        params['WStsD']['Pn'] = 6;
        params['WStsD']['Sl'] = 6;
        params['WStsD']['Cl'] = 6;
        params['WStsD']['El'] = 3;
        params['WStsD']['Ht'] = 6;
        params['WStsD']['Tx'] = 8;
        params['WStsD']['Bl'] = 0;
        params['WStsD']['Cr'] = 0;
        params['WStsD']['Gs'] = 8;
        params['WStsD']['Mg'] = 4;
        params['WStsD']['Rd'] = 12;
        params['WStsD']['Vr'] = 6;
        params['WStsD']['Vd'] = 3;
        params['WStsD']['Ab'] = 0;
        params['WStDm'] = [];
        params['MStDm'] = [];
        
        DOMWepForm.addEventListener('submit',function(submitEvent) {submitEvent.preventDefault(); thisBuild.verifyAllParamsAndCalculate.bind(thisBuild)();});
        DOMModForm.addEventListener('submit',function(submitEvent) {submitEvent.preventDefault(); thisBuild.verifyAllParamsAndCalculate.bind(thisBuild)();});
        
        DOMAnimateChangeButton.addEventListener('click',
            function()
            {
                if (scrollingEnabled == -1)
                {
                    scrollingEnabled = 1;
                    DOMAnimateChangeButton.style.color = 'red';
                }
                else
                {
                    scrollingEnabled = -1;
                    DOMAnimateChangeButton.style.color = '';
                }
                thisBuild.updateDPS(true);
            }
        );
        
        params['WTimeScroll'] = 0;
        params['MTimeScroll'] = 0;
        //console.log(params);
        
        this.updateDPS(false);
        
        for (paramName in params)
        {
            if (Array.isArray(params[paramName]))
            {
                vParams[paramName] = [];
                pParams[paramName] = [];
                for (elemType in params[paramName])
                {
                    pParams[paramName][elemType] = params[paramName][elemType];
                    vParams[paramName][elemType] = 0;
                }
            }
            else
            {
                pParams[paramName] = params[paramName];
                vParams[paramName] = 0;
            }
        }
        
        this.verifyAllParamsAndCalculate();
        //this.updateDPS(true);
        
        this.DOMBuild.style.display='';//'inline-flex';
    }
    
    this.initialize=function()
    {
        var templateContainer = document.getElementById('templateContainer');
        container = document.getElementById('container');
        DOMTemplate = document.getElementById('build_##');
        //templateContainer.removeChild(DOMTemplate);
        
        builds.push(new build(0));
        container.appendChild(builds[0].DOMBuild);
        builds.push(new build(1));
        container.appendChild(builds[1].DOMBuild);
    }
    
    /*
    this.numberFormat=function(iElement)
    {
        var iValue = parseFloat(iElement.value);
        if (isNaN(iValue))
        {
            iElement.value = '0.000';
        }
        else
        {
            iElement.value = iValue.toFixed(3);
        }
    };
    */
};
