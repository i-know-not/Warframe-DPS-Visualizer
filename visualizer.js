var visualizer=new function()
{
    var DOMTemplate;
    var builds = [];
    var container;
    var factorials = [1,1];
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
    
    function factorial(n)
    {
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
        var sizeX = 400;
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
        
        this.plot = function(n,pellets)
        {
            var accumProb = {};
            var pVals = [];
            var nPellets = Math.ceil(n);
            var split = n + 1 - Math.ceil(n);
            
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
                        areaPlots[i].setAttribute('style', 'fill:'+'rgba(0,0,0,0.025)'+'; stroke:black; stroke-width:1;');
                        svg.appendChild(areaPlots[i]);
                    }
                    
                    //var accumProb = 0;
                    var pointsStr = ' '+sizeX+','+sizeY+' 0,'+sizeY+' ';
                    
                    for (var ip in pVals)
                    {
                        var pAny = pVals[ip];
                        var p = 1-Math.pow(1-pAny,1/pellets);
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
                sides[0b000].style.zIndex = Math.ceil(depth*100);
                sides[0b001].style.zIndex = 0;
                sides[0b010].style.zIndex = 0;
                sides[0b011].style.zIndex = Math.ceil(width*100);
            }
            else if (azimuthMod < Math.PI * 1.0)
            {
                sides[0b000].style.zIndex = 0;
                sides[0b001].style.zIndex = Math.ceil(depth*100);
                sides[0b010].style.zIndex = 0;
                sides[0b011].style.zIndex = Math.ceil(width*100);
            }
            else if (azimuthMod < Math.PI * 1.5)
            {
                sides[0b000].style.zIndex = 0;
                sides[0b001].style.zIndex = Math.ceil(depth*100);
                sides[0b010].style.zIndex = Math.ceil(width*100);
                sides[0b011].style.zIndex = 0;
            }
            else
            {
                sides[0b000].style.zIndex = Math.ceil(depth*100);
                sides[0b001].style.zIndex = 0;
                sides[0b010].style.zIndex = Math.ceil(width*100);
                sides[0b011].style.zIndex = 0;
            }
            
            if (altitude < 0)
            {
                sides[0b100].style.zIndex = 0;
                sides[0b101].style.zIndex = Math.ceil(height*100);
            }
            else
            {
                sides[0b100].style.zIndex = Math.ceil(height*100);
                sides[0b101].style.zIndex = 0;
            }
            
            for (var i in sides)
            {
                if (sides[i].style.zIndex == 0 && !showBackFace)
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
            
            minDim = Math.min(Math.abs(width),Math.abs(height),Math.abs(depth));
            this.DOMBox.style.opacity = minDim > baffleDist ? 1 : minDim;
            
            if (baffleDist == 0)
            {
                return;
            }
            
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
        var DOMParams = [];
        var params = [];
        var pParams = [];
        var vParams = [];
        var DOMWepForm;
        var DOMModForm;
        var DOMDPSDisp;
        var DOMDPSWShotVal;
        var DOMDPSMShotVal;
        var DOMDPSMSttsVal;
        var DOMDPSWDPSVal;
        var DOMDPSMDPSVal;
        var DOMDPSSDPSVal;
        var DOMDPSShotDispOrigin;
        var DOMDPSSttsDispOrigin;
        var DOMDPSSttGraphOrigin;
        var DOMDPSRateDispOrigin;
        
        var DOMAnimateChangeButton;
        
        var shotDispBoxes = [];
        var moddedSttsDispLabel;
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
        var DPSShotScale = 0.2;
        //var DPSShotBorderScale = DPSShotScale*2;
        var DPSSttsScale = 0.2;
        //var DPSSttsBorderScale = DPSSttsScale*2;
        var DPSRateScale = 0.2;
        //var DPSRateBorderScale = DPSRateScale/2;
        
        var DPSTimeRange = 5;
        
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
                iElement = DOMParams[paramName];
                var iValue = parseFloat(iElement.value);
                var isWep = paramName.startsWith("Wep");
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
            
            
            uparams['DmgeBonus'] = uparams['ModDamage']/100;
            uparams['DmgeFactr'] = 1+uparams['DmgeBonus'];
            uparams['ElemBonus'] = uparams['ModElemental']/100;
            uparams['ElemFactr'] = 1+uparams['ElemBonus'];
            uparams['MultBonus'] = uparams['ModMultishot']/100;
            uparams['MultFactr'] = 1+uparams['MultBonus'];
            uparams['ModPellets'] = uparams['WepPellets'] * uparams['MultFactr'];
            uparams['WCrtProbl'] = uparams['WepCC']/100;
            uparams['WCrtBonus'] = uparams['WepCD']-1;
            uparams['MCrtProbl'] = uparams['WCrtProbl'] * (1+uparams['ModCC']/100);
            uparams['MCrtBonus'] = uparams['WepCD']*(1+uparams['ModCD']/100)-1;
            
            uparams['StsCBonus'] = uparams['ModSC']/100;
            uparams['StsCFactr'] = 1+uparams['StsCBonus'];
            
            uparams['RateBonus'] = uparams['ModFR']/100;
            uparams['RateFactr'] = 1+uparams['RateBonus']
            
            uparams['MRate'] = Math.max(uparams['WepFR']*uparams['RateFactr'],1/60);
            uparams['RateFactr'] = uparams['MRate']/uparams['WepFR'];
            
            uparams['WepDamage'] = (
                uparams['WepImDamage'  ] +
                uparams['WepPnDamage'  ] +
                uparams['WepSlDamage'  ] +
                uparams['WepClDamage'  ] +
                uparams['WepElDamage'  ] +
                uparams['WepHtDamage'  ] +
                uparams['WepTxDamage'  ] +
                uparams['WepBlDamage'  ] +
                uparams['WepCrDamage'  ] +
                uparams['WepGsDamage'  ] +
                uparams['WepMgDamage'  ] +
                uparams['WepRdDamage'  ] +
                uparams['WepVrDamage'  ]
            );
            
            uparams['WShot'] = uparams['WepDamage'] * (1+uparams['WCrtProbl']*uparams['WCrtBonus']);
            uparams['MShot'] = uparams['WepDamage'] * uparams['DmgeFactr'] * uparams['ElemFactr'] * uparams['MultFactr'] * (1+uparams['MCrtProbl']*uparams['MCrtBonus']);
            uparams['RShot'] = uparams['WShot'] == 0 ? 0 : uparams['MShot'] / uparams['WShot'];
            
            uparams['WStsC'] = Math.min(uparams['WepSC']/100,1);
            uparams['MStsC'] = Math.min(uparams['WStsC'] * uparams['StsCFactr'],1);
            
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
            
            uparams['WDPS'] = uparams['WepDamage'] * (1+uparams['WCrtProbl']*uparams['WCrtBonus']) * uparams['WepFR'];
            uparams['MDPS'] = uparams['WepDamage'] * uparams['DmgeFactr'] * uparams['ElemFactr'] * uparams['MultFactr'] * (1+uparams['MCrtProbl']*uparams['MCrtBonus']) * uparams['MRate'];
            uparams['SDPS'] = uparams['MDPS'] * uparams['MMagTime']/uparams['MCycleTime'];
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
            var MPStsC = 1-Math.pow(1-uparams['MStsC'],1/uparams['WepPellets']);
            
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
            
            baseDamageDim = Math.pow(uparams['WepDamage'],1/3.);
            modDamageWidth = baseDamageDim * uparams['DmgeBonus'];
            modElementalWidth = baseDamageDim * uparams['DmgeFactr'];
            modElementalDepth = baseDamageDim * uparams['ElemBonus'];
            modMultishotHeight = baseDamageDim * uparams['MultBonus'];
            modMultishotDepth = baseDamageDim * uparams['ElemFactr'];
            weaponCritHeight = baseDamageDim * uparams['MultFactr'] * uparams['WCrtProbl'];
            weaponCritWidth = modElementalWidth * uparams['WCrtBonus'];
            moddedCritHeight = baseDamageDim * uparams['MultFactr'] * uparams['MCrtProbl'];
            moddedCritWidth = modElementalWidth * uparams['MCrtBonus'];
            
            rateBaseHeight = Math.pow(uparams['WShot'],1/3.);
            rateBaseWidth = rateBaseHeight;
            rateBaseDepth = rateBaseHeight;
            
            //solve {x*y=z, (x-1)*r=(y-1)} for x,y
            rateModWidth = (Math.pow(RB*RB + RB*(4*uparams['RShot'] - 2) + 1,1/2) + RB - 1)/(2*RB) * rateBaseHeight;
            rateModHeight  = (Math.pow(RB*RB + RB*(4*uparams['RShot'] - 2) + 1,1/2) - RB + 1)/2;
            rateModHeight = Math.pow(rateModHeight,1/2) * rateBaseHeight;
            rateModDepth = rateModHeight;
            
            
            /*
            var WNRows = Math.min(Math.ceil(rateBaseWidth/4*DPSRateScale*uparams['WepFR']),WMagShots);
            
            for (var i = weaponRateDispBoxes.length-1; i >= WNumShots && i >= 1; i--)
            {
                weaponRateDispBoxes.pop().removeParent();
            }
            
            for (var i = 0; i < WNumShots; i++)
            {
                if (i >= weaponRateDispBoxes.length)
                {
                    i = weaponRateDispBoxes.push(new box(idStr,'DPSMiniBase','baseDisp',-1,false, 0))-1;
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
                var xP = xT*4/DPSRateScale;
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
                    weaponRateDispBoxes[i].setTransform(xP,0,-rowNo*rateBaseDepth,rateBaseWidth,rateBaseHeight,rateBaseDepth,viewAzimuth,viewAltitude,DPSRateScale);
                    weaponRateDispBoxes[i].setSideColor(sideColor);
                    weaponRateDispBoxes[i].DOMBox.style.opacity = opacity;
                    weaponRateDispBoxes[i].DOMBox.style.visibility = 'visible';
                }
            }
            */
            
            var MNRows = Math.min(Math.ceil(rateModHeight/4*DPSRateScale*uparams['MRate']),MMagShots);
            //var MNRows = Math.ceil(rateModWidth/4*DPSRateScale*uparams['MRate']);
            
            for (var i = moddedRateDispBoxes.length-1; i >= MNumShots && i >= 1; i--)
            {
                moddedRateDispBoxes.pop().removeParent();
            }
            
            for (var i = 0; i < MNumShots; i++)
            {
                if (i >= moddedRateDispBoxes.length)
                {
                    i = moddedRateDispBoxes.push(new box(idStr,'DPSMiniBase','rateDisp',-1,false, 0))-1;
                    moddedRateDispBoxes[i].setParent(DOMDPSRateDispOrigin);
                }
                
                var xI = i + MFirstShot;
                
                var shotNo = xI+MShotOffset;
                var magNo = Math.floor(shotNo/MMagShots);
                shotNo = shotNo % MMagShots;
                shotNo = shotNo < 0 ? shotNo + MMagShots : shotNo;
                var rowNo = Math.round(shotNo % MNRows);
                var DT = magNo * uparams['MCycleTime'] + shotNo / uparams['MRate'] - MTOffset;
                var DP = DT*4/DPSRateScale;
                var opacity = 1-Math.exp(-0.05*Math.min(rateModWidth,rateModHeight));
                var borderColor = 'black';
                var sideColor = 'grey';
                if (DT < 0)
                {
                    borderColor = 'transparent';
                    opacity = Math.max(1+DT,0);
                    sideColor = 'rgba(255,0,0,'+opacity+')';
                }
                else 
                {
                    if (DT >= DPSTimeRange)
                    {
                        opacity *= Math.max(DPSTimeRange+1-DT,0);
                    }
                    sideColor = 'rgba(127,127,127,'+opacity+')';
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
                    moddedRateDispBoxes[i].setTransform(-rateModWidth-Math.max(0,MNRows*rateModHeight*0.6-15/DPSRateScale),-DP,-rowNo*rateModDepth,rateModWidth,rateModHeight,rateModDepth,viewAzimuth,viewAltitude,DPSRateScale);
                    moddedRateDispBoxes[i].setSideColor(sideColor);
                    moddedRateDispBoxes[i].setBorderColor(borderColor);
                    //moddedRateDispBoxes[i].DOMBox.style.opacity = opacity;
                    //moddedRateDispBoxes[i].DOMBox.style.display = 'block';
                    moddedRateDispBoxes[i].DOMBox.style.visibility = 'visible';
                }
            }
            
            rateTimeAxis.setTransform(-Math.max(0,MNRows*rateModHeight*0.6-15/DPSRateScale),-4*TDispStart/DPSRateScale,0,0.25/DPSRateScale,4*(TDispEnd-TDispStart+8)/DPSRateScale,[0,-1,0],[0,0,1],-uparams['MTimeScroll'],viewAzimuth,viewAltitude,DPSRateScale);
            
            if (!scrollOnly)
            {
                DOMDPSWShotVal.innerHTML=uparams['WShot'].toFixed(3);
                DOMDPSMShotVal.innerHTML=uparams['MShot'].toFixed(3);
                DOMDPSMSttsVal.innerHTML=(1-Math.pow(1-uparams['MStsC'],1/uparams['WepPellets']))*uparams['ModPellets'];
                DOMDPSWDPSVal.innerHTML=uparams['WDPS'].toFixed(3);
                DOMDPSMDPSVal.innerHTML=uparams['MDPS'].toFixed(3);
                DOMDPSSDPSVal.innerHTML=uparams['SDPS'].toFixed(3);
                
                shotDispBoxes['DPSBase'].setTransform(0,0,0,baseDamageDim,baseDamageDim,baseDamageDim,viewAzimuth,viewAltitude,DPSShotScale);
                
                shotDispBoxes['DPSDmge'].setTransform(baseDamageDim,0,0,modDamageWidth,baseDamageDim,baseDamageDim,viewAzimuth,viewAltitude,DPSShotScale);
                //shotDispBoxes['DPSDmge'].DOMBox.style.opacity = Math.abs(uparams['DmgeBonus']) > 0.1 ? 1 : Math.abs(uparams['DmgeBonus'])*10;
                
                shotDispBoxes['DPSElem'].setTransform(0,0,-baseDamageDim,modElementalWidth,baseDamageDim,modElementalDepth,viewAzimuth,viewAltitude,DPSShotScale);
                //shotDispBoxes['DPSElem'].DOMBox.style.opacity = Math.abs(uparams['ElemBonus']) > 0.1 ? 1 : Math.abs(uparams['ElemBonus'])*10;
                
                shotDispBoxes['DPSMult'].setTransform(0,modMultishotHeight,0,modElementalWidth,modMultishotHeight,modMultishotDepth,viewAzimuth,viewAltitude,DPSShotScale);
                //shotDispBoxes['DPSMult'].DOMBox.style.opacity = Math.abs(uparams['MultBonus']) > 0.1 ? 1 : Math.abs(uparams['MultBonus'])*10;
                
                shotDispBoxes['DPSWCrt'].setTransform(modElementalWidth,modMultishotHeight*uparams['WCrtProbl'],0,weaponCritWidth,weaponCritHeight,modMultishotDepth,viewAzimuth,viewAltitude,DPSShotScale);
                if (uparams['WCrtProbl'] > 2) {WCrtBorderColor = 'darkred';}
                else if (uparams['WCrtProbl'] > 1) {WCrtBorderColor = 'darkorange';}
                shotDispBoxes['DPSWCrt'].setBorderColor(WCrtBorderColor)
                //shotDispBoxes['DPSWCrt'].DOMBox.style.opacity = Math.abs(uparams['WCrtProbl']) > 0.1 ? 1 : Math.abs(uparams['WCrtProbl'])*10;
                
                shotDispBoxes['DPSMCrt'].setTransform(modElementalWidth,modMultishotHeight*uparams['MCrtProbl'],0,moddedCritWidth,moddedCritHeight,modMultishotDepth,viewAzimuth,viewAltitude,DPSShotScale);
                if (uparams['MCrtProbl'] > 2) {MCrtBorderColor = 'darkred';}
                else if (uparams['MCrtProbl'] > 1) {MCrtBorderColor = 'darkorange';}
                shotDispBoxes['DPSMCrt'].setBorderColor(MCrtBorderColor)
                //shotDispBoxes['DPSMCrt'].DOMBox.style.opacity = Math.abs(uparams['MCrtProbl']) > 0.1 ? 1 : Math.abs(uparams['MCrtProbl'])*10;
                
                shotDispBoxes['DPSCDmg'].setTransform(modElementalWidth,modMultishotHeight,0,moddedCritWidth,baseDamageDim*uparams['MultFactr'],modMultishotDepth,viewAzimuth,viewAltitude,DPSShotScale);
                
                rateFireAxis.setTransform(-Math.max(0,MNRows*rateModHeight*0.6-15/DPSRateScale),0,2/DPSRateScale,50/DPSRateScale,(MNRows)*rateModHeight+4/DPSRateScale,[0,0,-1],[1,0,0],0,viewAzimuth,viewAltitude,DPSRateScale);
                
                // shotDispBoxes['DPSWCrt'].setTransform(0,0,weaponCritDepth,weaponCritWidth,modMultishotHeight,weaponCritDepth,viewAzimuth,viewAltitude,DPSShotScale);
                // //shotDispBoxes['DPSWCrt'].DOMBox.style.opacity = 
                
                // shotDispBoxes['DPSMCrt'].setTransform(0,0,moddedCritDepth,moddedCritWidth,modMultishotHeight,moddedCritDepth,viewAzimuth,viewAltitude,DPSShotScale);
                // //shotDispBoxes['DPSMCrt'].DOMBox.style.opacity = 
                
                var accumProb = 0;
                var u = 0.5/DPSSttsScale;
                var s = 8;
                var split = uparams['ModPellets'] + 1 - MNBars;
                
                moddedSttGraphSVG.plot(uparams['ModPellets'],uparams['WepPellets']);
                // moddedSttGraphLabel.setTransform(0,0,uparams['MStsC']*8*s*u,0,0,[0,0,-1],[1,0,0],viewAzimuth,viewAltitude,DPSSttsScale);
                // moddedSttGraphAxis.setTransform(0,8*u,uparams['MStsC']*8*s*u,1,8*s*u+1,[0,0,-1],[1,0,0],0,viewAzimuth,viewAltitude,DPSSttsScale);
                moddedSttGraphLabel.setTransform(0,0,0,0,0,[0,0,-1],[1,0,0],viewAzimuth,viewAltitude,DPSSttsScale);
                moddedSttGraphAxis.setTransform(0,s*u,0,1,6*s*u+1,[0,0,-1],[1,0,0],0,viewAzimuth,viewAltitude,DPSSttsScale);
                
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
                        i = moddedSttsDispBoxes.push(new box(idStr,'DPSSttsProbBar','sttsDisp',-1,false, 0))-1;
                        moddedSttsOutlBoxes.push(new box(idStr,'DPSSttsProbBar','stslDisp',1000,false, 0));
                        moddedSttsDispBoxes[i].setParent(DOMDPSSttsDispOrigin);
                        moddedSttsOutlBoxes[i].setParent(DOMDPSSttsDispOrigin);
                    }
                    
                    moddedSttsDispBoxes[i].DOMBox.style.zIndex = MNBars - i;
                    moddedSttsOutlBoxes[i].DOMBox.style.zIndex = 1000 + i;
                    
                    var prob1 = binCalc(MPStsC,MNBars,i) * split;
                    var prob2 = i < MNBars ? binCalc(MPStsC,MNBars-1,i) * (1-split) : 0;
                    var prob = prob1+prob2;
                    accumProb += prob;
                    //console.log(i,MPStsC,MNBars,binCalc(MPStsC,MNBars,i),binCalc(MPStsC,MNBars-1,i),prob1,prob2);
                    
                    if (i == 0)
                    {
                        moddedSttsDispBoxes[i].DOMBox.style.visibility = 'hidden';
                        // moddedSttsOutlBoxes[i].DOMBox.style.visibility = 'hidden';
                        moddedSttsOutlBoxes[i].setTransform(0,s*accumProb*u,-uparams['MStsC']*6*s*u,MNBars*u,0.01,0.01,viewAzimuth,viewAltitude,DPSSttsScale);
                        moddedSttsDispLabel.setTransform(4,(s*accumProb-2.6)*u,-uparams['MStsC']*6*s*u,0,0,[1,0,0],[0,0,1],viewAzimuth,viewAltitude,DPSSttsScale);
                        // var decPlaces = Math.max(MNBars*0.5,Math.ceil(-Math.log10(prob)));
                        var decPlaces = Math.ceil(-Math.log10(prob));
                        decPlaces = prob == 0 ? 0 : Math.min(Math.max(1,decPlaces),14)
                        // var moddedStsCDispVal = (100-prob*100).toFixed(Math.min(Math.max(4,decPlaces),14));
                        var moddedStsCDispVal = (100-prob*100).toFixed(decPlaces);
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
                        moddedSttsDispLabel.setContents('Arsenal ~ '+moddedStsCDispVal+'%');
                    }
                    else
                    {
                        moddedSttsDispBoxes[i].setTransform(0,s*accumProb*u,-uparams['MStsC']*6*s*u,i*u,s*prob*u,0.01,viewAzimuth,viewAltitude,DPSSttsScale);
                        moddedSttsOutlBoxes[i].setTransform(0+(i-1)*u,s*u,-uparams['MStsC']*6*s*u,u,(i<MNBars?1:split)*s*u,0.01,viewAzimuth,viewAltitude,DPSSttsScale);
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
                    
                    if (i > Math.round(uparams['WepPellets']))
                    {
                        moddedSttsOutlBoxes[i].setBorderColor('rgba(0  ,111,223,0.3)');
                    }
                    else
                    {
                        moddedSttsOutlBoxes[i].setBorderColor('');
                    }
                }
                //console.log(accumProb);
                
                //rateDispWBox.setTransform(0,rateBaseHeight,0,rateBaseWidth,rateBaseHeight,rateBaseDepth,viewAzimuth,viewAltitude,DPSRateScale);
                //rateDispBoxes['modb'].setTransform(0,rateModHeight,0,rateModWidth,rateModHeight,rateModDepth,viewAzimuth,viewAltitude,DPSRateScale);
                //rateDispBoxes['modb'].DOMBox.style.opacity = 1-Math.exp(-0.05*rateModWidth);
                //console.log(rateModWidth,Math.exp(-0.08*rateModWidth),rateDispBoxes['modb'].DOMBox.style.opacity);
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
                        pParams[paramName] = params[paramName];
                        vParams[paramName] = 0;
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
        
        DOMParams['WepImDamage'  ] = this.DOMBuild.querySelector('#iWeaponImDamage'    +idStr);
        DOMParams['WepPnDamage'  ] = this.DOMBuild.querySelector('#iWeaponPnDamage'    +idStr);
        DOMParams['WepSlDamage'  ] = this.DOMBuild.querySelector('#iWeaponSlDamage'    +idStr);
        DOMParams['WepClDamage'  ] = this.DOMBuild.querySelector('#iWeaponClDamage'    +idStr);
        DOMParams['WepElDamage'  ] = this.DOMBuild.querySelector('#iWeaponElDamage'    +idStr);
        DOMParams['WepHtDamage'  ] = this.DOMBuild.querySelector('#iWeaponHtDamage'    +idStr);
        DOMParams['WepTxDamage'  ] = this.DOMBuild.querySelector('#iWeaponTxDamage'    +idStr);
        DOMParams['WepBlDamage'  ] = this.DOMBuild.querySelector('#iWeaponBlDamage'    +idStr);
        DOMParams['WepCrDamage'  ] = this.DOMBuild.querySelector('#iWeaponCrDamage'    +idStr);
        DOMParams['WepGsDamage'  ] = this.DOMBuild.querySelector('#iWeaponGsDamage'    +idStr);
        DOMParams['WepMgDamage'  ] = this.DOMBuild.querySelector('#iWeaponMgDamage'    +idStr);
        DOMParams['WepRdDamage'  ] = this.DOMBuild.querySelector('#iWeaponRdDamage'    +idStr);
        DOMParams['WepVrDamage'  ] = this.DOMBuild.querySelector('#iWeaponVrDamage'    +idStr);
        DOMParams['WepPellets'   ] = this.DOMBuild.querySelector('#iWeaponPellets'     +idStr);
        DOMParams['WepCC'        ] = this.DOMBuild.querySelector('#iWeaponCC'          +idStr);
        DOMParams['WepCD'        ] = this.DOMBuild.querySelector('#iWeaponCD'          +idStr);
        DOMParams['WepSC'        ] = this.DOMBuild.querySelector('#iWeaponSC'          +idStr);
        DOMParams['WepFR'        ] = this.DOMBuild.querySelector('#iWeaponFR'          +idStr);
        DOMParams['WepCons'      ] = this.DOMBuild.querySelector('#iWeaponCons'        +idStr);
        DOMParams['WepMag'       ] = this.DOMBuild.querySelector('#iWeaponMag'         +idStr);
        DOMParams['WepReload'    ] = this.DOMBuild.querySelector('#iWeaponReload'      +idStr);
        
        DOMParams['ModDamage'    ] = this.DOMBuild.querySelector('#iModBaseDamage'     +idStr);
        DOMParams['ModElemental' ] = this.DOMBuild.querySelector('#iModElementalDamage'+idStr);
        DOMParams['ModMultishot' ] = this.DOMBuild.querySelector('#iModMultishot'      +idStr);
        DOMParams['ModCC'        ] = this.DOMBuild.querySelector('#iModCC'             +idStr);
        DOMParams['ModCD'        ] = this.DOMBuild.querySelector('#iModCD'             +idStr);
        DOMParams['ModSC'        ] = this.DOMBuild.querySelector('#iModSC'             +idStr);
        DOMParams['ModFR'        ] = this.DOMBuild.querySelector('#iModFR'             +idStr);
        DOMParams['ModMag'       ] = this.DOMBuild.querySelector('#iModMag'            +idStr);
        DOMParams['ModReload'    ] = this.DOMBuild.querySelector('#iModReload'         +idStr);
        
        DOMWepForm = this.DOMBuild.querySelector('#weaponForm'+idStr);
        DOMModForm = this.DOMBuild.querySelector('#modForm'+idStr);
        
        //construct graphics
        DOMDPSDisp = this.DOMBuild.querySelector('#dpsDisp'+idStr);
        DOMDPSWShotVal = DOMDPSDisp.querySelector('#WShotVal'+idStr);
        DOMDPSMShotVal = DOMDPSDisp.querySelector('#MShotVal'+idStr);
        DOMDPSMSttsVal = DOMDPSDisp.querySelector('#MSttsVal'+idStr);
        DOMDPSWDPSVal = DOMDPSDisp.querySelector('#WDPSVal'+idStr);
        DOMDPSMDPSVal = DOMDPSDisp.querySelector('#MDPSVal'+idStr);
        DOMDPSSDPSVal = DOMDPSDisp.querySelector('#SDPSVal'+idStr);
        
        DOMAnimateChangeButton = DOMDPSDisp.querySelector('#bForceAnimate'+idStr);
        
        DOMDPSShotDispOrigin = this.DOMBuild.querySelector('#DPSShotDispOrigin'+idStr);
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
        
        rateTimeAxis = new axis(idStr,'DPSRateAxis','blackAxis',5001    ,4/DPSRateScale,0);
        rateTimeAxis.setParent(DOMDPSRateDispOrigin);
        
        rateFireAxis = new axis(idStr,'DPSFireAxis','redAxis',  5000    ,0,0);
        rateFireAxis.setParent(DOMDPSRateDispOrigin);
        //rateDispWBox = new box(idStr,'DPSMiniBase','cdmgDisp', 0,true, 5000);
        //rateDispBoxes['modb'] = new box(idStr,'DPSMiniBase','rateDisp',-1, 0);
        
        moddedSttsDispLabel = new label(idStr,'DPSSttsText', 'sttsText', 1000);
        moddedSttsDispLabel.setParent(DOMDPSSttsDispOrigin);
        
        moddedSttGraphLabel = new label(idStr,'DPSSttGraph', 'sttGraph', 1000);
        moddedSttGraphLabel.setParent(DOMDPSSttGraphOrigin);
        moddedSttGraphLabel.setTransform(0,0,0,0,0,[0,0,-1],[1,0,0],viewAzimuth,viewAltitude,DPSSttsScale)
        
        moddedSttGraphAxis = new axis(idStr,'DPSSttGraphAxis','blackAxis',0,24*0.1/DPSSttsScale,1001);
        moddedSttGraphAxis.setParent(DOMDPSSttGraphOrigin);
        
        moddedSttGraphSVG = new binDistPlot();
        moddedSttGraphSVG.plot(1,1);
        moddedSttGraphSVG.setParent(moddedSttGraphLabel.DOMElement);
        
        for (var dispItem in shotDispBoxes)
        {
            shotDispBoxes[dispItem].setParent(DOMDPSShotDispOrigin);
        }
        
        //rateDispWBox.setParent(DOMDPSRateDispOrigin);
        
        for (var paramName in DOMParams)
        {
            DOMParams[paramName].addEventListener('blur',thisBuild.verifyParamAndCalculate.bind(thisBuild,paramName));
            params[paramName] = parseFloat(DOMParams[paramName].value);
        }
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
            pParams[paramName] = params[paramName];
            vParams[paramName] = 0;
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
