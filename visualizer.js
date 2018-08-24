var visualizer=new function()
{
    var DOMTemplate;
    var builds = [];
    var container;
    
    function crossProd(u,v)
    {
        return [u[1]*v[2] - u[2]*v[1],
                u[2]*v[0] - u[0]*v[2],
                u[0]*v[1] - u[1]*v[0]];
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
        
        line = document.createElement('div');
        line.className = 'dispAxis ' + extraClasses;
        
        majTickTemplate = document.createElement('div');
        majTickTemplate.className = 'dispAxis ' + extraClasses;
        
        var parentElement;
        
        this.DOMAxis.appendChild(line);
        
        this.setTransform = function(x,y,z,width,length,vector,normal,phase,azimuth,altitude,scale)
        {
            var perspectiveT = '';
            var azimuthMod = azimuth % Math.PI*2;
            var phaseMod = phase % 1;
            phaseMod = phaseMod < 1 ? phaseMod + 1 : phaseMod;
            
            var across = crossProd(normal,vector);
            var matrixStr = 'matrix3d(' +
                vector[0]   +','+   vector[1]   +','+   vector[2]   +',0,'+
                across[0]   +','+   across[1]   +','+   across[2]   +',0,'+
                normal[0]   +','+   normal[1]   +','+   normal[2]   +',0,'+
                '0,0,0,1)';
            
            line.style.width = length*scale+'em';
            line.style.height = width*scale+'em';
            
            line.style.transform = perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+(x+0     )*scale+'em,'+(y+0     )*scale+'em,'+(z+0     )*scale+'em) '+matrixStr;
            
            
            if (majInt == 0)
            {
                return;
            }
            
            nMajTicks = Math.floor(length/majInt+1);
            
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
                var xP = (i+phaseMod)*majInt;
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
        var DOMDPSWDPSVal;
        var DOMDPSMDPSVal;
        var DOMDPSSDPSVal;
        var DOMDPSShotDispOrigin;
        
        var DOMDPSRateDispOrigin;
        
        var DOMAnimateChangeButton;
        
        var shotDispBoxes = [];
        var moddedRateDispBoxes = [];
        var weaponRateDispBoxes = [];
        var rateTimeAxis;
        var rateFireAxis;
        var DPSDispBaffleDist = 5;
        
        var viewAzimuth = -Math.PI/6*1.2;
        var viewAltitude = -Math.PI/6*0.5;
        var DPSShotScale = 0.2;
        //var DPSShotBorderScale = DPSShotScale*2;
        
        var DPSRateScale = 0.15;
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
            iElement = DOMParams[eventParamName];
            var iValue = parseFloat(iElement.value);
            if (isNaN(iValue))
            {
                iElement.value = params[eventParamName].toFixed(3);
            }
            else
            {
                if (eventParamName.startsWith("Wep") && iValue < 0) {iValue = 0;}
                if (eventParamName.startsWith("Mod") && iValue < -100) {iValue = -100;}
                if (eventParamName == "WepFR" && iValue < 1/60) {iValue = 1/60;}
                if (eventParamName == "WepCons" && iValue < 1/60) {iValue = 1/60;}
                iElement.value = iValue.toFixed(3);
                
                if (params[eventParamName] != iValue)
                {
                    params[eventParamName] = iValue;
                    this.updateDPS(true);
                }
            }
        }
        
        this.verifyAllParamsAndCalculate = function()
        {
            console.log("submit");
            for (var paramName in DOMParams)
            {
                iElement = DOMParams[paramName];
                var iValue = parseFloat(iElement.value);
                if (isNaN(iValue))
                {
                    iElement.value = params[paramName].toFixed(3);
                }
                else
                {
                    params[paramName] = iValue;
                    iElement.value = iValue.toFixed(3);
                }
            }
            
            this.updateDPS(true);
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
            uparams['WCrtProbl'] = uparams['WepCC']/100;
            uparams['WCrtBonus'] = uparams['WepCD']-1;
            uparams['MCrtProbl'] = uparams['WCrtProbl'] * (1+uparams['ModCC']/100);
            uparams['MCrtBonus'] = uparams['WepCD']*(1+uparams['ModCD']/100)-1;
            uparams['RateBonus'] = uparams['ModFR']/100;
            uparams['RateFactr'] = 1+uparams['RateBonus']
            
            uparams['MRate'] = Math.max(uparams['WepFR']*uparams['RateFactr'],1/60);
            uparams['RateFactr'] = uparams['MRate']/uparams['WepFR'];
            
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
            
            uparams['WShot'] = uparams['WepDamage'] * (1+uparams['WCrtProbl']*uparams['WCrtBonus']);
            uparams['MShot'] = uparams['WepDamage'] * uparams['DmgeFactr'] * uparams['ElemFactr'] * uparams['MultFactr'] * (1+uparams['MCrtProbl']*uparams['MCrtBonus']);
            uparams['RShot'] = uparams['WShot'] == 0 ? 0 : uparams['MShot'] / uparams['WShot'];
            
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
            
            var rateBaseWidth;
            var rateBaseDepth;
            var rateBaseHeight;
            var rateModWidth;
            var rateModDeph;
            var rateModHeight;
            
            //calculateDPS(uparams);
            
            var azimuthMod = viewAzimuth % Math.PI*2;
            
            var RB = 1;
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
            rateModHeight = (Math.pow(RB*RB + RB*(4*uparams['RShot'] - 2) + 1,1/2) + RB - 1)/(2*RB) * rateBaseHeight;
            rateModDepth  = (Math.pow(RB*RB + RB*(4*uparams['RShot'] - 2) + 1,1/2) - RB + 1)/2;
            rateModDepth = Math.pow(rateModDepth,1/2) * rateBaseHeight;
            rateModWidth = rateModDepth;
            
            
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
            
            var MNRows = Math.min(Math.ceil(rateModWidth/4*DPSRateScale*uparams['MRate']),MMagShots);
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
                var xT = magNo * uparams['MCycleTime'] + shotNo / uparams['MRate'] - MTOffset;
                var xP = xT*4/DPSRateScale;
                var opacity = 1-Math.exp(-0.05*Math.min(rateModWidth,rateModHeight));
                var borderColor = 'black';
                var sideColor = 'grey';
                if (xT < 0)
                {
                    sideColor = 'rgb(127,0,0)';
                    borderColor = 'transparent';
                    opacity = Math.max(1+xT,0);
                }
                else if (xT >= DPSTimeRange)
                {
                    opacity *= Math.max(DPSTimeRange+1-xT,0);
                }
                
                if (azimuthMod < Math.PI)
                {
                    moddedRateDispBoxes[i].DOMBox.style.zIndex = xI - Math.floor(rowNo/MNRows*MNumShots);
                }
                else
                {
                    moddedRateDispBoxes[i].DOMBox.style.zIndex = -xI + Math.floor(rowNo/MNRows*MNumShots);;
                }
                
                if (xT < -1 || xT > DPSTimeRange + 1)
                {
                    //moddedRateDispBoxes[i].DOMBox.style.display = 'none';
                    moddedRateDispBoxes[i].DOMBox.style.visibility = 'hidden';
                }
                else
                {
                    moddedRateDispBoxes[i].setTransform(xP,rateModHeight,-rowNo*rateModDepth,rateModWidth,rateModHeight,rateModDepth,viewAzimuth,viewAltitude,DPSRateScale);
                    moddedRateDispBoxes[i].setSideColor(sideColor);
                    moddedRateDispBoxes[i].setBorderColor(borderColor);
                    moddedRateDispBoxes[i].DOMBox.style.opacity = opacity;
                    //moddedRateDispBoxes[i].DOMBox.style.display = 'block';
                    moddedRateDispBoxes[i].DOMBox.style.visibility = 'visible';
                }
            }
            
            rateTimeAxis.setTransform(4*TDispStart/DPSRateScale,Math.min(rateModHeight,60),0,0.25/DPSRateScale,4*(TDispEnd-TDispStart+8)/DPSRateScale,[1,0,0],[0,0,1],-uparams['MTimeScroll'],viewAzimuth,viewAltitude,DPSRateScale);
            
            if (!scrollOnly)
            {
                DOMDPSWShotVal.innerHTML=uparams['WShot'].toFixed(3);
                DOMDPSMShotVal.innerHTML=uparams['MShot'].toFixed(3);
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
                //shotDispBoxes['DPSWCrt'].DOMBox.style.opacity = Math.abs(uparams['WCrtProbl']) > 0.1 ? 1 : Math.abs(uparams['WCrtProbl'])*10;
                
                shotDispBoxes['DPSMCrt'].setTransform(modElementalWidth,modMultishotHeight*uparams['MCrtProbl'],0,moddedCritWidth,moddedCritHeight,modMultishotDepth,viewAzimuth,viewAltitude,DPSShotScale);
                //shotDispBoxes['DPSMCrt'].DOMBox.style.opacity = Math.abs(uparams['MCrtProbl']) > 0.1 ? 1 : Math.abs(uparams['MCrtProbl'])*10;
                
                shotDispBoxes['DPSCDmg'].setTransform(modElementalWidth,modMultishotHeight,0,moddedCritWidth,baseDamageDim*uparams['MultFactr'],modMultishotDepth,viewAzimuth,viewAltitude,DPSShotScale);
                
                rateFireAxis.setTransform(0,Math.min(rateModHeight,60),0,50/DPSRateScale,(1+MNRows)*rateModWidth,[0,0,-1],[0,1,0],0,viewAzimuth,viewAltitude,DPSRateScale);
                
                // shotDispBoxes['DPSWCrt'].setTransform(0,0,weaponCritDepth,weaponCritWidth,modMultishotHeight,weaponCritDepth,viewAzimuth,viewAltitude,DPSShotScale);
                // //shotDispBoxes['DPSWCrt'].DOMBox.style.opacity = 
                
                // shotDispBoxes['DPSMCrt'].setTransform(0,0,moddedCritDepth,moddedCritWidth,modMultishotHeight,moddedCritDepth,viewAzimuth,viewAltitude,DPSShotScale);
                // //shotDispBoxes['DPSMCrt'].DOMBox.style.opacity = 
                
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
            console.log(animationID);
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
        
        DOMParams['WepDamage'    ] = this.DOMBuild.querySelector('#iWeaponDamage'      +idStr);
        DOMParams['WepMultishot' ] = this.DOMBuild.querySelector('#iWeaponMultishot'   +idStr);
        DOMParams['WepCC'        ] = this.DOMBuild.querySelector('#iWeaponCC'          +idStr);
        DOMParams['WepCD'        ] = this.DOMBuild.querySelector('#iWeaponCD'          +idStr);
        DOMParams['WepFR'        ] = this.DOMBuild.querySelector('#iWeaponFR'          +idStr);
        DOMParams['WepCons'      ] = this.DOMBuild.querySelector('#iWeaponCons'        +idStr);
        DOMParams['WepMag'       ] = this.DOMBuild.querySelector('#iWeaponMag'         +idStr);
        DOMParams['WepReload'    ] = this.DOMBuild.querySelector('#iWeaponReload'      +idStr);
        
        DOMParams['ModDamage'    ] = this.DOMBuild.querySelector('#iModBaseDamage'     +idStr);
        DOMParams['ModElemental' ] = this.DOMBuild.querySelector('#iModElementalDamage'+idStr);
        DOMParams['ModMultishot' ] = this.DOMBuild.querySelector('#iModMultishot'      +idStr);
        DOMParams['ModCD'        ] = this.DOMBuild.querySelector('#iModCD'             +idStr);
        DOMParams['ModCC'        ] = this.DOMBuild.querySelector('#iModCC'             +idStr);
        DOMParams['ModFR'        ] = this.DOMBuild.querySelector('#iModFR'             +idStr);
        DOMParams['ModMag'       ] = this.DOMBuild.querySelector('#iModMag'            +idStr);
        DOMParams['ModReload'    ] = this.DOMBuild.querySelector('#iModReload'         +idStr);
        
        DOMWepForm = this.DOMBuild.querySelector('#weaponForm'+idStr);
        DOMModForm = this.DOMBuild.querySelector('#modForm'+idStr);
        
        //construct graphics
        DOMDPSDisp = this.DOMBuild.querySelector('#dpsDisp'+idStr);
        DOMDPSWShotVal = DOMDPSDisp.querySelector('#WShotVal'+idStr);
        DOMDPSMShotVal = DOMDPSDisp.querySelector('#MShotVal'+idStr);
        DOMDPSWDPSVal = DOMDPSDisp.querySelector('#WDPSVal'+idStr);
        DOMDPSMDPSVal = DOMDPSDisp.querySelector('#MDPSVal'+idStr);
        DOMDPSSDPSVal = DOMDPSDisp.querySelector('#SDPSVal'+idStr);
        
        DOMAnimateChangeButton = DOMDPSDisp.querySelector('#bForceAnimate'+idStr);
        
        DOMDPSShotDispOrigin = this.DOMBuild.querySelector('#DPSShotDispOrigin'+idStr);
        
        DOMDPSRateDispOrigin = this.DOMBuild.querySelector('#DPSRateDispOrigin'+idStr);
        
        shotDispBoxes['DPSBase'] = new box(idStr,'DPSBase','baseDisp', 0,true, DPSDispBaffleDist);
        shotDispBoxes['DPSDmge'] = new box(idStr,'DPSDmge','dmgeDisp', 1,true, DPSDispBaffleDist);
        shotDispBoxes['DPSElem'] = new box(idStr,'DPSElem','elemDisp',-1,true, DPSDispBaffleDist);
        shotDispBoxes['DPSMult'] = new box(idStr,'DPSMult','multDisp',-2,true, DPSDispBaffleDist);
        shotDispBoxes['DPSWCrt'] = new box(idStr,'DPSWCrt','wcrtDisp', 3,true, 0);
        shotDispBoxes['DPSMCrt'] = new box(idStr,'DPSMCrt','mcrtDisp', 4,true, DPSDispBaffleDist);
        shotDispBoxes['DPSCDmg'] = new box(idStr,'DPSCDmg','cdmgDisp', 2,true, 0);
        
        rateTimeAxis = new axis(idStr,'DPSRateAxis','blackAxis',5000    ,4/DPSRateScale,0);
        rateFireAxis = new axis(idStr,'DPSRateAxis','redAxis',  -5000   ,0,0);
        rateFireAxis.setParent(DOMDPSRateDispOrigin);
        rateTimeAxis.setParent(DOMDPSRateDispOrigin);
        //rateDispWBox = new box(idStr,'DPSMiniBase','cdmgDisp', 0,true, 5000);
        //rateDispBoxes['modb'] = new box(idStr,'DPSMiniBase','rateDisp',-1, 0);
        
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
        
        this.updateDPS(true);
        
        this.DOMBuild.style.display='inline-flex';
    }
    
    this.initialize=function()
    {
        var templateContainer = document.getElementById('templateContainer');
        container = document.getElementById('container');
        DOMTemplate = document.getElementById('build_##');
        templateContainer.removeChild(DOMTemplate);
        
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
