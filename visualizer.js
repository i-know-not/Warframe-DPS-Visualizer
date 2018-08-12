var visualizer=new function()
{
    var DOMTemplate;
    var builds = [];
    var container;
    
    function box(extraClasses)
    {
        var sideID = 0;
        var sides = [];
        var pushTransforms = [];
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
        
        
        this.setTransform = function(x,y,z,width,height,depth,azimuth,altitude,scale)
        {
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
            
            xT = x+width/2;
            yT = y-height/2;
            zT = z-depth/2;
            
            // sides[0b000].style.transform = 'translate3d(-50%,-50%,0) perspective(100em) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY( 000deg) translateZ('+pushTransforms[0b000]+'em)';
            // sides[0b001].style.transform = 'translate3d(-50%,-50%,0) perspective(100em) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY( 180deg) translateZ('+pushTransforms[0b001]+'em)';
            // sides[0b010].style.transform = 'translate3d(-50%,-50%,0) perspective(100em) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY(-090deg) translateZ('+pushTransforms[0b010]+'em)';
            // sides[0b011].style.transform = 'translate3d(-50%,-50%,0) perspective(100em) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY( 090deg) translateZ('+pushTransforms[0b011]+'em)';
            // sides[0b100].style.transform = 'translate3d(-50%,-50%,0) perspective(100em) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX(-090deg) rotateY( 000deg) translateZ('+pushTransforms[0b100]+'em)';
            // sides[0b101].style.transform = 'translate3d(-50%,-50%,0) perspective(100em) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 090deg) rotateY( 000deg) translateZ('+pushTransforms[0b101]+'em)';
            
            sides[0b000].style.transform = 'translate3d(-50%,-50%,0) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY( 000deg) translateZ('+pushTransforms[0b000]+'em)';
            sides[0b001].style.transform = 'translate3d(-50%,-50%,0) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY( 180deg) translateZ('+pushTransforms[0b001]+'em)';
            sides[0b010].style.transform = 'translate3d(-50%,-50%,0) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY(-090deg) translateZ('+pushTransforms[0b010]+'em)';
            sides[0b011].style.transform = 'translate3d(-50%,-50%,0) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY( 090deg) translateZ('+pushTransforms[0b011]+'em)';
            sides[0b100].style.transform = 'translate3d(-50%,-50%,0) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX(-090deg) rotateY( 000deg) translateZ('+pushTransforms[0b100]+'em)';
            sides[0b101].style.transform = 'translate3d(-50%,-50%,0) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 090deg) rotateY( 000deg) translateZ('+pushTransforms[0b101]+'em)';
            
            azimuthMod = azimuth % Math.PI*2;
            
            if (azimuthMod < Math.PI * 0.5)
            {
                sides[0b000].style.zIndex = 1;
                sides[0b001].style.zIndex = 0;
                sides[0b010].style.zIndex = 0;
                sides[0b011].style.zIndex = 1;
            }
            else if (azimuthMod < Math.PI * 1.0)
            {
                sides[0b000].style.zIndex = 0;
                sides[0b001].style.zIndex = 1;
                sides[0b010].style.zIndex = 0;
                sides[0b011].style.zIndex = 1;
            }
            else if (azimuthMod < Math.PI * 1.5)
            {
                sides[0b000].style.zIndex = 0;
                sides[0b001].style.zIndex = 1;
                sides[0b010].style.zIndex = 1;
                sides[0b011].style.zIndex = 0;
            }
            else
            {
                sides[0b000].style.zIndex = 1;
                sides[0b001].style.zIndex = 0;
                sides[0b010].style.zIndex = 1;
                sides[0b011].style.zIndex = 0;
            }
            
            if (altitude < 0)
            {
                sides[0b100].style.zIndex = 0;
                sides[0b101].style.zIndex = 1;
            }
            else
            {
                sides[0b100].style.zIndex = 1;
                sides[0b101].style.zIndex = 0;
            }
        }
        
        this.setParent = function(node)
        {
            for (sideID in sides)
            {
                node.appendChild(sides[sideID]);
            }
        }
        
        this.setTransform(0,0,0,2,2,2,-Math.PI/6,-Math.PI/6,1);
    }
    
    function build(id)
    {
        var i;
        var unmoddedDPS = 0;
        var moddedDPS = 0;
        //hook and parse input values
        var DOMParams = [];
        var params = [];
        var dispParams = [];
        var DOMDPSDisp;
        var DOMDPSVal;
        var DOMDPSDispOrigin;
        var DOMDPSBaseBox;
        var DOMDPSDmgeBox;
        var DOMDPSElemBox;
        var DOMDPSMultBox;
        var DOMDPSBCrtBox;
        var DOMDPSCritBox;
        
        var baseDamageBox;
        var dmgeModBox;
        var elemModBox;
        var multModBox;
        var baseCritBox;
        var critModdedBox;
        
        var idStr;
        var descendantList;
        
        var thisBuild = this;
        
        var viewAzimuth = -Math.PI/6;
        var viewAltitude = -Math.PI/6;
        
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
            this.updateDPS();
        }
        
        this.updateDPS = function()
        {
            var baseDamageDim;
            var modDamageWidth;
            var modElementalWidth;
            var modElementalHeight;
            var modMultishotHeight;
            var modMultishotDepth;
            var baseCritWidth;
            var baseCritDepth;
            var moddedCritWidth;
            var moddedCritDepth;
            
            var modDamageBonus = params['ModDamage']/100;
            var modDamageFactor = 1+modDamageBonus;
            var modElementalBonus = params['ModElemental']/100;
            var modElementalFactor = 1+modElementalBonus;
            var modMultishotBonus = params['ModMultishot']/100;
            var modMultishotFactor = 1+modMultishotBonus;
            var baseCritChance = params['WepCC']/100;
            var baseCritBonus = params['WepCD']-1;
            var moddedCritChance = baseCritChance * (1+params['ModCC']/100);
            var moddedCritBonus = params['WepCD']*(1+params['ModCD']/100)-1;
            unmoddedDPS = params['WepDamage'] * (1+baseCritChance*baseCritBonus) * params['WepFR'];
            moddedDPS = params['WepDamage'] * modDamageFactor * modElementalFactor * modMultishotFactor * (1+moddedCritChance*moddedCritBonus) * params['WepFR']*(1+params['ModFR']/100);
            console.log(unmoddedDPS);
            console.log(moddedDPS);
            DOMDPSVal.innerHTML=moddedDPS.toFixed(3);
            
            baseDamageDim = Math.pow(params['WepDamage'],1/3.)*0.75;
            modDamageWidth = baseDamageDim * modDamageBonus;
            modElementalWidth = baseDamageDim * modDamageFactor;
            modElementalHeight = baseDamageDim * modElementalBonus;
            modMultishotHeight = baseDamageDim * modElementalFactor;
            modMultishotDepth = baseDamageDim * modMultishotBonus;
            baseCritDepth = baseDamageDim * modMultishotFactor * baseCritChance;
            baseCritWidth = modElementalWidth * baseCritBonus;
            moddedCritDepth = baseDamageDim * modMultishotFactor * moddedCritChance;
            moddedCritWidth = modElementalWidth * moddedCritBonus;
            
            baseDamageBox.setTransform(0,0,0,baseDamageDim,baseDamageDim,baseDamageDim,viewAzimuth,viewAltitude,1);
            
            dmgeModBox.setTransform(baseDamageDim,0,0,modDamageWidth,baseDamageDim,baseDamageDim,viewAzimuth,viewAltitude,1);
            DOMDPSDmgeBox.style.opacity = Math.abs(modDamageBonus) > 0.1 ? 1 : Math.abs(modDamageBonus)*10;
            
            elemModBox.setTransform(0,-baseDamageDim,0,modElementalWidth,modElementalHeight,baseDamageDim,viewAzimuth,viewAltitude,1);
            DOMDPSElemBox.style.opacity = Math.abs(modElementalBonus) > 0.1 ? 1 : Math.abs(modElementalBonus)*10;
            
            multModBox.setTransform(0,0,-baseDamageDim,modElementalWidth,modMultishotHeight,modMultishotDepth,viewAzimuth,viewAltitude,1);
            DOMDPSMultBox.style.opacity = Math.abs(modMultishotBonus) > 0.1 ? 1 : Math.abs(modMultishotBonus)*10;
            
            baseCritBox.setTransform(0,0,baseCritDepth,baseCritWidth,modMultishotHeight,baseCritDepth,viewAzimuth,viewAltitude,1);
            //DOMDPSBCrtBox.style.opacity = 
            
            critModdedBox.setTransform(0,0,moddedCritDepth,moddedCritWidth,modMultishotHeight,moddedCritDepth,viewAzimuth,viewAltitude,1);
            //DOMDPSCritBox.style.opacity = 
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
        
        
        //construct graphics
        DOMDPSDisp = this.DOMBuild.querySelector('#dpsDisp'+idStr);
        DOMDPSVal = DOMDPSDisp.querySelector('#dpsVal'+idStr);
        DOMDPSDispOrigin = this.DOMBuild.querySelector('#dispOrigin'+idStr);
        
        DOMDPSBaseBox = document.createElement('div');
        DOMDPSBaseBox.className = 'dispOrigin';
        DOMDPSBaseBox.id = 'baseBox'+idStr;
        DOMDPSBaseBox.style.zIndex = 0+100;
        DOMDPSDispOrigin.appendChild(DOMDPSBaseBox);
        
        DOMDPSDmgeBox = document.createElement('div');
        DOMDPSDmgeBox.className = 'dispOrigin';
        DOMDPSDmgeBox.id = 'baseBox'+idStr;
        DOMDPSDmgeBox.style.zIndex = 1+100;
        DOMDPSDispOrigin.appendChild(DOMDPSDmgeBox);
        
        DOMDPSElemBox = document.createElement('div');
        DOMDPSElemBox.className = 'dispOrigin';
        DOMDPSElemBox.id = 'elemBox'+idStr;
        DOMDPSElemBox.style.zIndex = 2+100;
        DOMDPSDispOrigin.appendChild(DOMDPSElemBox);
        
        DOMDPSMultBox = document.createElement('div');
        DOMDPSMultBox.className = 'dispOrigin';
        DOMDPSMultBox.id = 'multBox'+idStr;
        DOMDPSMultBox.style.zIndex = -1+100;
        DOMDPSDispOrigin.appendChild(DOMDPSMultBox);
        
        DOMDPSBCrtBox = document.createElement('div');
        DOMDPSBCrtBox.className = 'dispOrigin';
        DOMDPSBCrtBox.id = 'bcrtBox'+idStr;
        DOMDPSBCrtBox.style.zIndex = 3+100;
        DOMDPSDispOrigin.appendChild(DOMDPSBCrtBox);
        
        DOMDPSCritBox = document.createElement('div');
        DOMDPSCritBox.className = 'dispOrigin';
        DOMDPSCritBox.id = 'critBox'+idStr;
        DOMDPSCritBox.style.zIndex = 4+100;
        DOMDPSDispOrigin.appendChild(DOMDPSCritBox);
        
        baseDamageBox = new box('baseDisp');
        baseDamageBox.setParent(DOMDPSBaseBox);
        
        dmgeModBox = new box('dmgeDisp');
        dmgeModBox.setParent(DOMDPSDmgeBox);
        
        elemModBox = new box('elemDisp');
        elemModBox.setParent(DOMDPSElemBox);
        
        multModBox = new box('multDisp');
        multModBox.setParent(DOMDPSMultBox);
        
        baseCritBox = new box('bcrtDisp');
        baseCritBox.setParent(DOMDPSBCrtBox);
        
        critModdedBox = new box('critDisp');
        critModdedBox.setParent(DOMDPSCritBox);
        
        for (var paramName in DOMParams)
        {
            DOMParams[paramName].addEventListener('blur',thisBuild.verifyParamAndCalculate.bind(thisBuild,paramName));
            params[paramName] = parseFloat(DOMParams[paramName].value);
        }
        console.log(params);
        
        this.updateDPS();
        
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
