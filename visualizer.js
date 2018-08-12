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
            
            sides[0b000].style.transform = 'translate3d(-50%,-50%,0) perspective(100em) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY( 000deg) translateZ('+pushTransforms[0b000]+'em)';
            sides[0b001].style.transform = 'translate3d(-50%,-50%,0) perspective(100em) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY( 180deg) translateZ('+pushTransforms[0b001]+'em)';
            sides[0b010].style.transform = 'translate3d(-50%,-50%,0) perspective(100em) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY(-090deg) translateZ('+pushTransforms[0b010]+'em)';
            sides[0b011].style.transform = 'translate3d(-50%,-50%,0) perspective(100em) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 000deg) rotateY( 090deg) translateZ('+pushTransforms[0b011]+'em)';
            sides[0b100].style.transform = 'translate3d(-50%,-50%,0) perspective(100em) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX(-090deg) rotateY( 000deg) translateZ('+pushTransforms[0b100]+'em)';
            sides[0b101].style.transform = 'translate3d(-50%,-50%,0) perspective(100em) rotateX('+altitude+'rad) rotateY('+azimuth+'rad) translate3d('+xT+'em,'+yT+'em,'+zT+'em) rotateX( 090deg) rotateY( 000deg) translateZ('+pushTransforms[0b101]+'em)';
            
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
    
    /*
    this.generateBoxSideTransformVals = function(side,azimuth,altitude)
    {
        var rotX = 0;
        var rotY = 0;
        switch(side)
        {
            case 0b000: //front
                break;
            case 0b001: //back
                rotY = Math.PI;
                break;
            case 0b010: //left
                rotY = -Math.PI/2;
                break;
            case 0b011: //right
                rotY = Math.PI/2;
                break;
            case 0b100: //bottom
                rotX = -Math.PI/2;
                break;
            case 0b101: //top
                rotX = Math.PI/2;
                break;
        }
        return [rotX, rotY];
    }
    
    this.stringBoxSideTransformVals = function()
    {
    }
    */
    
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
        var DOMDPSElemBox;
        var DOMDPSMultBox;
        var DOMDPSCritBox;
        
        var baseDamageBox;
        var elemModBox;
        var multModBox;
        var critModBox;
        
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
            unmoddedDPS = params['WepDamage'] * (1+(params['WepCC']/100*(params['WepCD']-1))) * params['WepFR'];
            moddedDPS = params['WepDamage'] * (1+params['ModDamage']/100) * (1+params['ModElemental']/100) * (1+params['ModMultishot']/100)* (1+(params['WepCC']*(1+params['ModCC']/100)/100*(params['WepCD']*(1+params['ModCD']/100)-1))) * params['WepFR']*(1+params['ModFR']/100);
            console.log(unmoddedDPS);
            console.log(moddedDPS);
            DOMDPSVal.innerHTML=moddedDPS.toFixed(3);
            
            baseDamageDim = Math.pow(params['WepDamage'],1/3.);
            baseDamageBox.setTransform(0,0,0,baseDamageDim,baseDamageDim,baseDamageDim,viewAzimuth,viewAltitude,1);
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
        DOMDPSVal = this.DOMBuild.querySelector('#dpsVal'+idStr);
        DOMDPSDisp = this.DOMBuild.querySelector('#dpsDisp'+idStr);
        DOMDPSDispOrigin = this.DOMBuild.querySelector('#dispOrigin'+idStr);
        
        DOMBaseBox = document.createElement('div');
        DOMBaseBox.className = 'dispOrigin';
        DOMBaseBox.id = 'baseBox'+idStr;
        DOMBaseBox.style.zIndex = 0;
        DOMDPSDispOrigin.appendChild(DOMBaseBox);
        
        DOMElemBox = document.createElement('div');
        DOMElemBox.className = 'dispOrigin';
        DOMElemBox.id = 'elemBox'+idStr;
        DOMElemBox.style.zIndex = 1;
        DOMDPSDispOrigin.appendChild(DOMElemBox);
        
        DOMMultBox = document.createElement('div');
        DOMMultBox.className = 'dispOrigin';
        DOMMultBox.id = 'multBox'+idStr;
        DOMMultBox.style.zIndex = -1;
        DOMDPSDispOrigin.appendChild(DOMMultBox);
        
        baseDamageBox = new box('baseDisp');
        baseDamageBox.setParent(DOMBaseBox);
        
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
