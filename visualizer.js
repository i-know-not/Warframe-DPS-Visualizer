var visualizer=new function()
{
    var DOMTemplate;
    var builds = [];
    var container;
    
    function baffleF(val,step)
    {
        return Math.floor(val/step)+1;
    }
    
    function baffleL(val,step)
    {
        return Math.ceil(val/step)-1;
    }
    
    function box(idStr, boxName, extraClasses, zIndex, useBaffles)
    {
        this.DOMBox = document.createElement('div');
        this.DOMBox.className = 'dispOrigin';
        this.DOMBox.id = boxName+'Box'+idStr;
        this.DOMBox.style.zIndex = zIndex+100;
        
        var sideID = 0;
        var sides = [];
        var pushTransforms = [];
        
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
            pushTransforms[sideID] = 0.5;
        }
        
        for (sideID in sides)
        {
            this.DOMBox.appendChild(sides[sideID]);
        }
        
        this.setTransform = function(x,y,z,width,height,depth,azimuth,altitude,scale)
        {
            var baffleDist = 0.5;
            var perspectiveT = "";
            var azimuthMod = azimuth % Math.PI*2;
            
            pushTransforms[0b000] = depth   /2;
            pushTransforms[0b001] = depth   /2;
            pushTransforms[0b010] = width   /2;
            pushTransforms[0b011] = width   /2;
            pushTransforms[0b100] = height  /2;
            pushTransforms[0b101] = height  /2;
            
            
            sides[0b000].style.width    = width     + 'em';
            sides[0b001].style.width    = width     + 'em';
            sides[0b000].style.height   = height    + 'em';
            sides[0b001].style.height   = height    + 'em';
            
            sides[0b010].style.width    = depth     + 'em';
            sides[0b011].style.width    = depth     + 'em';
            sides[0b010].style.height   = height    + 'em';
            sides[0b011].style.height   = height    + 'em';
            
            sides[0b100].style.width    = width     + 'em';
            sides[0b101].style.width    = width     + 'em';
            sides[0b100].style.height   = depth     + 'em';
            sides[0b101].style.height   = depth     + 'em';
            
            var xT = x+width/2;
            var yT = y-height/2;
            var zT = z-depth/2;
            
            //perspectiveT = "perspective(100em) ";
            
            sides[0b000].style.transform = 'translate3d(-50%,-50%,0) '+perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY( 000deg) translateZ('+pushTransforms[0b000]+'em)';
            sides[0b001].style.transform = 'translate3d(-50%,-50%,0) '+perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY( 180deg) translateZ('+pushTransforms[0b001]+'em)';
            sides[0b010].style.transform = 'translate3d(-50%,-50%,0) '+perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY(-090deg) translateZ('+pushTransforms[0b010]+'em)';
            sides[0b011].style.transform = 'translate3d(-50%,-50%,0) '+perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY( 090deg) translateZ('+pushTransforms[0b011]+'em)';
            sides[0b100].style.transform = 'translate3d(-50%,-50%,0) '+perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX(-090deg) rotateY( 000deg) translateZ('+pushTransforms[0b100]+'em)';
            sides[0b101].style.transform = 'translate3d(-50%,-50%,0) '+perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 090deg) rotateY( 000deg) translateZ('+pushTransforms[0b101]+'em)';
            
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
            
            if (!useBaffles)
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
                
                xBaffles[i].style.width     = depth     + 'em';
                xBaffles[i].style.height    = height    + 'em';
                var xP = (xF + i)*baffleDist + width/2;
                xBaffles[i].style.transform = 'translate3d(-50%,-50%,0) '+perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xP+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY(-090deg) translateZ('+pushTransforms[0b010]+'em)';
            }
            
            for (var i = yBaffles.length-1; i > yL-yF && i >= 0; i--)
            {
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
                
                yBaffles[i].style.width     = width     + 'em';
                yBaffles[i].style.height    = depth     + 'em';
                var yP = (yF + i)*baffleDist - height/2;
                yBaffles[i].style.transform = 'translate3d(-50%,-50%,0) '+perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yP+'em,'+zT+'em) rotateX(-090deg) rotateY( 000deg) translateZ('+pushTransforms[0b100]+'em)';
            }
            
            
            for (var i = zBaffles.length-1; i > zL-zF && i >= 0; i--)
            {
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
                
                zBaffles[i].style.width     = width     + 'em';
                zBaffles[i].style.height    = height    + 'em';
                var zP = (zF + i)*baffleDist - depth/2;
                zBaffles[i].style.transform = 'translate3d(-50%,-50%,0) '+perspectiveT+'rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zP+'em) rotateX( 000deg) rotateY( 000deg) translateZ('+pushTransforms[0b000]+'em)';;
            }
            
        }
        
        this.setParent = function(node)
        {
            parentElement = node;
            node.appendChild(this.DOMBox);
        }
        
        this.setZIndex = function(zIndex)
        {
            this.DOMBox.style.zIndex = zIndex;
        }
        
        this.setTransform(0,0,0,2,2,2,-Math.PI/6,-Math.PI/6,1);
    }
    
    function build(id)
    {
        var thisBuild = this;
        var i;
        var unmoddedDPS = 0;
        var moddedDPS = 0;
        
        //hook and parse input values
        var DOMParams = [];
        var params = [];
        var pParams = [];
        var vParams = [];
        var DOMWepForm;
        var DOMModForm;
        var DOMDPSDisp;
        var DOMDPSVal;
        var DOMDPSDispOrigin;
        
        var dispBoxes = [];
        
        var idStr;
        var descendantList;
        
        var viewAzimuth = -Math.PI/6;
        var viewAltitude = -Math.PI/6;
        
        var animationStart = null;
        var animationLastT = null;
        var animationID = null;
        
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
                params[eventParamName] = iValue;
                iElement.value = iValue.toFixed(3);
            }
            this.updateDPS(true);
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
            uparams['DmgeBonus'] = uparams['ModDamage']/100;
            uparams['DmgeFactr'] = 1+uparams['DmgeBonus'];
            uparams['ElemBonus'] = uparams['ModElemental']/100;
            uparams['ElemFactr'] = 1+uparams['ElemBonus'];
            uparams['MultBonus'] = uparams['ModMultishot']/100;
            uparams['MultFactr'] = 1+uparams['MultBonus'];
            uparams['BCrtProbl'] = uparams['WepCC']/100;
            uparams['BCrtBonus'] = uparams['WepCD']-1;
            uparams['MCrtProbl'] = uparams['BCrtProbl'] * (1+uparams['ModCC']/100);
            uparams['MCrtBonus'] = uparams['WepCD']*(1+uparams['ModCD']/100)-1;
            unmoddedDPS = uparams['WepDamage'] * (1+uparams['BCrtProbl']*uparams['BCrtBonus']) * uparams['WepFR'];
            moddedDPS = uparams['WepDamage'] * uparams['DmgeFactr'] * uparams['ElemFactr'] * uparams['MultFactr'] * (1+uparams['MCrtProbl']*uparams['MCrtBonus']) * uparams['WepFR']*(1+uparams['ModFR']/100);
        }
        
        function showDPS(uparams)
        {
            var baseDamageDim;
            var modDamageWidth;
            var modElementalWidth;
            var modElementalDepth;
            var modMultishotHeight;
            var modMultishotDepth;
            var baseCritWidth;
            var baseCritHeight;
            var moddedCritWidth;
            var moddedCritHeight;
            
            calculateDPS(uparams);
            
            //console.log(unmoddedDPS);
            //console.log(moddedDPS);
            
            DOMDPSVal.innerHTML=moddedDPS.toFixed(3);
            
            baseDamageDim = Math.pow(uparams['WepDamage'],1/3.)*0.4;
            modDamageWidth = baseDamageDim * uparams['DmgeBonus'];
            modElementalWidth = baseDamageDim * uparams['DmgeFactr'];
            modElementalDepth = baseDamageDim * uparams['ElemBonus'];
            modMultishotHeight = baseDamageDim * uparams['MultBonus'];
            modMultishotDepth = baseDamageDim * uparams['ElemFactr'];
            baseCritHeight = baseDamageDim * uparams['MultFactr'] * uparams['BCrtProbl'];
            baseCritWidth = modElementalWidth * uparams['BCrtBonus'];
            moddedCritHeight = baseDamageDim * uparams['MultFactr'] * uparams['MCrtProbl'];
            moddedCritWidth = modElementalWidth * uparams['MCrtBonus'];
            
            dispBoxes['DPSBase'].setTransform(0,0,0,baseDamageDim,baseDamageDim,baseDamageDim,viewAzimuth,viewAltitude,1);
            
            dispBoxes['DPSDmge'].setTransform(baseDamageDim,0,0,modDamageWidth,baseDamageDim,baseDamageDim,viewAzimuth,viewAltitude,1);
            dispBoxes['DPSDmge'].DOMBox.style.opacity = Math.abs(uparams['DmgeBonus']) > 0.1 ? 1 : Math.abs(uparams['DmgeBonus'])*10;
            
            dispBoxes['DPSElem'].setTransform(0,0,-baseDamageDim,modElementalWidth,baseDamageDim,modElementalDepth,viewAzimuth,viewAltitude,1);
            dispBoxes['DPSElem'].DOMBox.style.opacity = Math.abs(uparams['ElemBonus']) > 0.1 ? 1 : Math.abs(uparams['ElemBonus'])*10;
            
            dispBoxes['DPSMult'].setTransform(0,modMultishotHeight,0,modElementalWidth,modMultishotHeight,modMultishotDepth,viewAzimuth,viewAltitude,1);
            dispBoxes['DPSMult'].DOMBox.style.opacity = Math.abs(uparams['MultBonus']) > 0.1 ? 1 : Math.abs(uparams['MultBonus'])*10;
            
            dispBoxes['DPSBCrt'].setTransform(modElementalWidth,modMultishotHeight*uparams['BCrtProbl'],0,baseCritWidth,baseCritHeight,modMultishotDepth,viewAzimuth,viewAltitude,1);
            //dispBoxes['DPSBCrt'].DOMBox.style.opacity = Math.abs(uparams['BCrtProbl']) > 0.1 ? 1 : Math.abs(uparams['BCrtProbl'])*10;
            
            dispBoxes['DPSMCrt'].setTransform(modElementalWidth,modMultishotHeight*uparams['MCrtProbl'],0,moddedCritWidth,moddedCritHeight,modMultishotDepth,viewAzimuth,viewAltitude,1);
            dispBoxes['DPSMCrt'].DOMBox.style.opacity = Math.abs(uparams['MCrtProbl']) > 0.1 ? 1 : Math.abs(uparams['MCrtProbl'])*10;
            
            dispBoxes['DPSCDmg'].setTransform(modElementalWidth,modMultishotHeight,0,moddedCritWidth,baseDamageDim*uparams['MultFactr'],modMultishotDepth,viewAzimuth,viewAltitude,1);
            
            // dispBoxes['DPSBCrt'].setTransform(0,0,baseCritDepth,baseCritWidth,modMultishotHeight,baseCritDepth,viewAzimuth,viewAltitude,1);
            // //dispBoxes['DPSBCrt'].DOMBox.style.opacity = 
            
            // dispBoxes['DPSMCrt'].setTransform(0,0,moddedCritDepth,moddedCritWidth,modMultishotHeight,moddedCritDepth,viewAzimuth,viewAltitude,1);
            // //dispBoxes['DPSMCrt'].DOMBox.style.opacity = 
        }
        
        function animDPS(timeStamp)
        {
            var timeConst = 0.1;
            //var aParams = [];
            //var bParams = [];
            
            if (!animationStart)
            {
                animationStart = timeStamp;
            }
            else if (timeStamp - animationStart >= 2000)
            {
                for (paramName in params)
                {
                    pParams[paramName] = params[paramName];
                    vParams[paramName] = 0;
                }
                showDPS(params);
                animationID = null;
                return;
            }
            else
            {
                var t = (timeStamp - animationLastT) / 1000;
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
                showDPS(pParams);
            }
            animationLastT = timeStamp;
            animationID = window.requestAnimationFrame(animDPS);
        }
        
        this.updateDPS = function(animate)
        {
            calculateDPS(params);
            
            if (!animate)
            {
                showDPS(params);
                return;
            }
            
            if (animationID)
            {
                window.cancelAnimationFrame(animationID);
                animationID = null;
            }
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
        idStr = idStr.padStart(2,'00');
        
        //modify id of descendants
        descendantList = this.DOMBuild.querySelectorAll('*');
        
        for (i in descendantList)
        {
            var descendant = descendantList[i];
            if (typeof descendant == 'object')
            {
                descendant.id = descendant.id.replace('##',idStr);
            }
        }
        
        DOMParams['WepDamage'    ] = this.DOMBuild.querySelector('#iWeaponDamage'      +idStr);
        DOMParams['WepMultishot' ] = this.DOMBuild.querySelector('#iWeaponMultishot'   +idStr);
        DOMParams['WepCC'        ] = this.DOMBuild.querySelector('#iWeaponCC'          +idStr);
        DOMParams['WepCD'        ] = this.DOMBuild.querySelector('#iWeaponCD'          +idStr);
        DOMParams['WepFR'        ] = this.DOMBuild.querySelector('#iWeaponFR'          +idStr);
        
        DOMParams['ModDamage'    ] = this.DOMBuild.querySelector('#iModBaseDamage'     +idStr);
        DOMParams['ModElemental' ] = this.DOMBuild.querySelector('#iModElementalDamage'+idStr);
        DOMParams['ModMultishot' ] = this.DOMBuild.querySelector('#iModMultishot'      +idStr);
        DOMParams['ModCD'        ] = this.DOMBuild.querySelector('#iModCD'             +idStr);
        DOMParams['ModCC'        ] = this.DOMBuild.querySelector('#iModCC'             +idStr);
        DOMParams['ModFR'        ] = this.DOMBuild.querySelector('#iModFR'             +idStr);
        
        DOMWepForm = this.DOMBuild.querySelector('#weaponForm'+idStr);
        DOMModForm = this.DOMBuild.querySelector('#modForm'+idStr);
        
        //construct graphics
        DOMDPSDisp = this.DOMBuild.querySelector('#dpsDisp'+idStr);
        DOMDPSVal = DOMDPSDisp.querySelector('#dpsVal'+idStr);
        DOMDPSDispOrigin = this.DOMBuild.querySelector('#dispOrigin'+idStr);
        
        dispBoxes['DPSBase'] = new box(idStr,'DPSBase','baseDisp', 0, true );
        dispBoxes['DPSDmge'] = new box(idStr,'DPSDmge','dmgeDisp', 1, true );
        dispBoxes['DPSElem'] = new box(idStr,'DPSElem','elemDisp',-1, true );
        dispBoxes['DPSMult'] = new box(idStr,'DPSMult','multDisp',-2, true );
        dispBoxes['DPSBCrt'] = new box(idStr,'DPSBCrt','bcrtDisp', 3, false);
        dispBoxes['DPSMCrt'] = new box(idStr,'DPSMCrt','mcrtDisp', 4, true );
        dispBoxes['DPSCDmg'] = new box(idStr,'DPSCDmg','cdmgDisp', 2, false);
        
        for (var dispItem in dispBoxes)
        {
            dispBoxes[dispItem].setParent(DOMDPSDispOrigin);
        }
        
        for (var paramName in DOMParams)
        {
            DOMParams[paramName].addEventListener('blur',thisBuild.verifyParamAndCalculate.bind(thisBuild,paramName));
            params[paramName] = parseFloat(DOMParams[paramName].value);
        }
        DOMWepForm.addEventListener('submit',function(submitEvent) {submitEvent.preventDefault(); thisBuild.verifyAllParamsAndCalculate.bind(thisBuild)();});
        DOMModForm.addEventListener('submit',function(submitEvent) {submitEvent.preventDefault(); thisBuild.verifyAllParamsAndCalculate.bind(thisBuild)();});
        
        params['DmgeBonus'] = 0;
        params['DmgeFactr'] = 1;
        params['ElemBonus'] = 0;
        params['ElemFactr'] = 1;
        params['MultBonus'] = 0;
        params['MultFactr'] = 1;
        params['BCrtProbl'] = 0;
        params['BCrtBonus'] = 1;
        params['MCrtProbl'] = 0;
        params['MCrtBonus'] = 1;
        
        //console.log(params);
        
        for (paramName in params)
        {
            pParams[paramName] = params[paramName];
            vParams[paramName] = 0;
        }
        
        this.updateDPS(false);
        
        this.DOMBuild.style.display='inline-flex';
    }
    
    this.initialize=function()
    {
        container = document.getElementById('container');
        DOMTemplate = document.getElementById('build##');
        builds.push(new build(0));
        container.appendChild(builds[0].DOMBuild);
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
