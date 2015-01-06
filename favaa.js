/*
* Comfy - 1/2/2015 - 0.0.1

All snippets from stackoverflow are dedicated to the public domain. 

*/

var Utils = {

    /*Properties*/
    matchFnc: null,
    registers: {}, 

    /*Functions*/
    hasJQuery: function(){
        return window.jQuery;
    }, 

    stackTrace: function(identifier){
        var err = new Error();
        return err.stack;
    } , 

    save: function(key,value) {
        // if (Utils.onFirefox()) GM_setValue(key,JSON.stringify(value));
        // else localStorage.setItem(key,JSON.stringify(value));
    },

    load: function(key,def) {
        Utils.registers[key] = def; 
        return def; 
    },

    onClick: function(element,f) {
        element.addEventListener('click',function(e) {
            if (e.which != 1) return;
            if (f) f.call(this);
        },false);
    },

    query: function(root,selector) {
        if (!selector)
            return Array.prototype.slice.call(document.querySelectorAll(root),0);
        else
            return Array.prototype.slice.call(root.querySelectorAll(selector),0);
    }, 

    /*
    * Clones a javascript object
    */
    clone: function(obj){
        if(obj == null || typeof(obj) != 'object')
            return obj;

        var temp = obj.constructor(); // changed

        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                temp[key] = Utils.clone(obj[key]);
            }
        }
        return temp;
    },

    /*
    * Merges the two objects. The first parameter will be overwritten by the second. 
    */
    mergeObjects: function(obj1, obj2)
    {
        for (var attrname in obj2) { obj1[attrname] = obj2[attrname]; }
        return obj1; 
    },

    /* 
    *Defines an each property for NodeList. 
    */
    each: function(nodeList , f){
        for(var i = 0; i < nodeList.length; i++)
        {
            if( f( nodeList[i] , i ) === false ){ return false; } 
        }        
    } , 

    /*
    * Converts nodelist to array.
    */
    toArray: function(nl){
        if(nl.constructor.name == 'NodeList')
        {
            var l = [];
            for(var i = 0, ll = nl.length; i != ll; l.push(nl[i++]));            
            return l;
        }
        if(nl.constructor.name == 'NamedNodeMap')
        {
            var l = [];
            for(var i = 0, ll = nl.length; i != ll; l.push(nl[i++]));            
            return l;            
        }
    },

    changeText: function(nl , txt){
        var elements = []; 
        if( nl.constructor.name == 'NodeList' ){ elements = elements.concat( Utils.toArray(nl) ); }
        else if( Array.isArray(nl) ){ elements.concat(nl); }
        else { elements.push( nl ); }
        for(var n in elements){
            var ele = elements[n]; 
            for(var i = 0 ; i < ele.childNodes.length; i++){
                if( ele.childNodes[i].constructor.name == 'Text' ){ ele.childNodes[i].nodeValue = txt; break; } 
            }            
        }
    },

    /*
    * Matches Selector
    */
    is: function(element, selector){
        if( typeof( element.matchesSelector ) == 'function' ){ return element.matchesSelector(selector) }
        var matches = (element.document || element.ownerDocument).querySelectorAll(selector);

        var i = 0;
        while (matches[i] && matches[i] !== element) {
        i++;
        }
        return matches[i] ? true : false;
    }, 

    /*
    * Checks if there is an element that matches the selector in the array. 
    */
    has: function(elements, selector)
    {
        for(var i = 0; i < elements.length; i++){ if( Utils.is(elements[i] , selector ) ){ return true; } } return false;
    } ,

    isDomNode: function(o)
    {
        return (
        typeof Node === "object" ? o instanceof Node : 
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
        );
    } ,

    isDomElement: function(o)
    {
        return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
        );       
    } , 

    /*
    * Returns the HTTP Response Text
    */
    HTTPStatusText : function(status, url)
    {
        /*http://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html*/
        var codes = {
            "101" : 'Switching Protocols' , 
            "200" : 'OK' , 
            "201" : 'Created' , 
            "202" : 'Accepted' , 
            "203" : 'Non-Authoritative Information' , 
            "204" : 'No Content' , 
            "205" : 'Reset Content' , 
            "206" : 'Partial Content' , 
            "300" : 'Multiple Choices' , 
            "301" : 'Moved Permanently' , 
            "302" : 'Found' , 
            "303" : 'See Other' , 
            "304" : 'Not Modified' , 
            "305" : 'Use Proxy' , 
            "307" : 'Temporary Redirect' , 
            "400" : 'Bad Request' , 
            "401" : 'Unauthorized' , 
            "402" : 'Payment Required' , 
            "403" : 'Forbidden' , 
            "404" : 'Not Found' , 
            "405" : 'Method Not Allowed' , 
            "406" : 'Not Acceptable' , 
            "407" : 'Proxy Authentication Required' , 
            "408" : 'Request Time-out' , 
            "409" : 'Conflict' , 
            "410" : 'Gone' , 
            "411" : 'Length Required' , 
            "412" : 'Precondition Failed' , 
            "413" : 'Request Entity Too Large' , 
            "414" : 'Request-URI Too Large' , 
            "415" : 'Unsupported Media Type' , 
            "416" : 'Requested range not satisfiable' , 
            "417" : 'Expectation Failed' , 
            "500" : 'Internal Server Error' , 
            "501" : 'Not Implemented' , 
            "502" : 'Bad Gateway' , 
            "503" : 'Service Unavailable' , 
            "504" : 'Gateway Time-out' , 
            "505" : 'HTTP Version not supported' , 
        }; 
        return url + " " + codes[""+status]; 
    } , 

    isHTML: function(str){
        return /<[a-z][\s\S]*>/i.test(str);
    } , 

    isJSON: function(str, res){
        try{
            res.json = JSON.parse(str);
        }
        catch(e){
            return false; 
        }
        return true;
    } ,

    isXML: function(str, r){
        try{
            if (window.DOMParser)
            {
            parser=new DOMParser();
            xmlDoc=parser.parseFromString(txt,"text/xml");
            }
            else // code for IE
            {
            xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async=false;
            xmlDoc.loadXML(txt); 
            }
        }
        catch(e){
            return false;
        }
        r.xml = xmlDoc; 
        return true; 
    } , 

    JsonToLowerCase: function(obj){
        /*http://stackoverflow.com/questions/9421556/optimizing-javascript-code-that-lowercases-json-property-names*/
        var lowerCache = {};
        FN = function (obj)
        {
            if (typeof(obj) === "string" || typeof(obj) === "number")
                return obj;

                var l = obj.length;
            if (l) {
                l |= 0;
                var result = [];
                result.length = l;
                for (var i = 0; i < l; i++) {
                    var newVal = obj[i];
                    result[i] = typeof(newVal) === "string" ? newVal : FN(newVal);
                }
                return result;
            } else {
             var ret = {};
             for (var key in obj) {

                 var keyStr = typeof(key) === "string" ? key : String(key);
                 var newKey = lowerCache[keyStr];
                 if (newKey === undefined) {
                     newKey = keyStr.toLowerCase();
                     lowerCache[keyStr] = newKey;
                 }

                 var newVal = obj[key];
                 ret[newKey] = typeof(newVal) === "string" ? newVal : FN(newVal);
             }
             return ret;
            }
        };        
        return FN(obj); 
    } , 

    IntelligentParse: function(response)
    {
        var r = {}; 
        if( Utils.isJSON(response, r) ){ 
            /*JSON Parse*/
            return r.json; 
        }
        // if( Utils.isHTML(response) ){
        //     return 'is html'; 
        // }
        // if( Utils.isXML(response, r) ){
        //     return r.xml; 
        // }
        return response; 
        // else if( Utils.isHTML(response) ){
        //     /*HTML Parse*/
        // }
    } , 
};

function UTField(fieldName, utClass , ele )
{
    this.fieldName = fieldName; this.utClass = utClass; this.ele = ele; 
    this.revise = function(val){
        var tag = this.ele.tagName; 
        /*Setting the Default Values.*/
        if( tag == 'P' || tag == 'DIV' || tag == 'SPAN' || tag == 'H1' || tag == 'H2' || tag == 'H3'  || tag == 'H4' || tag == 'H5' 
            || tag == 'H6' || tag == 'H7' ){ Utils.changeText( this.ele , val ); } 
        if( tag == 'IMG' ){ this.utClass.ele.src = val; }
        if( tag == 'INPUT' ) { this.utClass.ele.val = val; }
    }
}

function UTClass(className, ele){ 
    this.className = className; this.ele = ele; 

    /*
    *Defines the Values
    */
    this.field = {}; 
    this.props = {}; 

    /*Analyzes the Dom and Assigns the Props accordingly.*/
    this.reload = function(){
        var elm = this.ele; 
        /*Building the attributes of the class*/
        for(var i = 0; i < elm.attributes.length; i++){
            var attribute = elm.attributes[i]; 
            this.props[attribute.name.toLowerCase()] = attribute.value.toLowerCase(); 
        }
        
        /*Check Child Nodes for templates*/
        var childs = elm.childNodes; 
        
        var searchLayers = Utils.toArray(childs); 
        while( searchLayers.length > 0 )
        {
            var layer = searchLayers.shift();
            if( !Utils.isDomElement( layer ) ){continue;}

            if( layer.hasAttribute('templateClass') ){
                var templateName = layer.getAttribute('templateClass').toLowerCase(); 
                if( !this.hasOwnProperty( templateName ) ){ this[templateName] = []; }
                this[templateName].push( new UTClass(templateName , layer) ); 
                continue;
            }

            for(var i = 0; i < layer.attributes.length; i++)
            {
                var attribute = layer.attributes[i];
                if(attribute.name == 'templatefield'){
                    this.field[ attribute.value.toLowerCase() ] = new UTField(attribute.value, this, layer); 
                }
            }
            searchLayers = searchLayers.concat( Utils.toArray( layer.childNodes) ); 
        }
    }

    this.revise = function(updateDataSet){
        var updateArray = []; 
        if( !Array.isArray(updateDataSet) ){ updateArray.push( updateData ); }
        else{ updateArray.concat( updateDataSet ); }

        for(var i in updateArray ){
            var updateData = updateArray[i]; 

            for(var name in updateData)
            {
                if( caller.props.hasOwnProperty(name) ){ 
                    /*A modification for an attribute has occured. Modify accordingly.*/
                }
                if( caller.field.hasOwnProperty(name) ){
                    /*A modification for a field has occured. Modify accordingly.*/
                    caller.field[name].revise( updateData[name] ); 
                }
            }
        }
    }

    /*Updates via ajax. Requires a starter. */
    this.update = function(obj){
        var dobj = Utils.clone( UT.defaultAjaxObject ); 
        var dobj = Utils.mergeObjects(dobj, obj); 

        var xhr = new XMLHttpRequest();

        var caller = this; 
        xhr.onreadystatechange = function() {
          if(xhr.readyState == 0){
            // open has not been called.
          }
          if(xhr.readyState == 1){
            // send has not been called.
          }
          if(xhr.readyState == 2){
            // send has been called, headers now available
          }
          if(xhr.readyState == 3){
            // partial responseText now available. 
          }
          if (xhr.readyState == 4) {
            //done
            if(xhr.status !== 200 && (xhr.status !== 100 ) ){
                // throw new Error( 'Status: ' + xhr.status + ' ( ' + Utils.HTTPStatusText(xhr.status, dobj.url) + ' ) . ' ); 
                return false; 
            }
            var response = xhr.responseText; 
            if( obj.success !== undefined){
               response = obj.success(xhr.responseText, xhr.statusText, xhr ); 
            }

            if(response === null || response === undefined){return null;}
            console.log(response); 

            if( response !== null && response !== undefined && response.constructor.name !== 'object'){
                try
                {
                    response = JSON.parse(xhr.responseText); 
                }
                catch(e){
                    throw new Error(e); 
                }                
            }

            /*Assume response is json.*/
            response = Utils.JsonToLowerCase(response); 

            /*Case where the Class is on the Upper-Most Directory.*/
            var updateData = response[caller.className.toLowerCase()];
            caller.revise(updateData); 
          }
        }

        // xhr.send( obj['type'].toLowerCase() === 'post' ? null : obj['data'] );
        if(dobj['type'].toLowerCase() == 'post'){
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");            
        }
        else if(dobj['type'].toLowerCase() == 'get'){
            if( dobj['data'] !== null )
            {
                if( dobj.url.indexOf('?') === -1) { dobj.url += '?'; }
                for (var attrname in dobj['data']) { dobj.url += '&'+attrname+'='+dobj['data'][attrname]; }
            }
        }

        xhr.open( dobj['type'] , dobj.url , dobj.async );

        xhr.send( dobj['data'] );
    }
    this.reload();
}

/*Ajax Util*/
var UT = 
{
	/*Binds*/
	evtBinds: {} , 

    /*Templates*/
    templates: {}, 


    /*
    * Default Ajax Object
    */
    defaultAjaxObject: {
        url: null , 
        type:'get', 
        async:true, 
        data: null,
    },

    /*
    * Makes a UT Class object and loads it to templates. 
    */
    loadTemplate: function(className, initialDomState){
        var domClone = initialDomState.cloneNode(true); 
        if( UT.templates[className] === undefined ) UT.templates[className] = new UTClass( className, initialDomState ); 
        return UT.templates[className]; 
    },

	/*
	* Removes all event listeners then readds them. 
	*/
	rebindEvents: function(){
	},

	onClick: function(selector, fnc){

		var els = document.querySelectorAll(selector); 
		for(var i = 0; i < els.length; i++){ var el = els.item(i); el.addEventListener('click', fnc); }

		// stores events for later binds. 
		if( UT.evtBinds.click === undefined)
			UT.evtBinds.click = [{ sel: selector , f: fnc}]; 
		else
			UT.evtBinds.click.push( {sel: selector, f:fnc} ); 

		return UT; 
	}, 

    /*Updates a specific template or templates if array given. */
    update: function(elem , xhrObject , responseHandle ){
        var utClass = new UTClass(elem.getAttribute('templateclass') , elem); 
        utClass.update(xhrObject);
    }, 

    /*Updates a list of templates, and uses a function for each of the templates to determine the xhrObject*/
    updates: function(elems, xhrFnc , responseHandle ){
        var elemSet = Utils.toArray(elems); 
        for(var ind in elemSet){
            var xhrObject = xhrFnc(elemSet[ind] , ind); 
            UT.update(elemSet[ind], xhrObject); 
        }
    }, 
}; 

document.addEventListener('click', function(e){
	// UT.onEvent('click', e); 
});

UT.onClick( '#reloadButton', function(){
}) 


// $(selector).click(function(){ UT.update(); })

// UT.select(selector).onUpdate(function(json, triggerEvt){
//     this.prop.title.innerHTML = json.name; 
//     this.prop.title.class = json.isActive ? 'active' : 'inactive'; 
// }).trigger( selector , 'event' )

// UT.init(); 

// function buildTemplate(template)
// {
//     /*Check Child Nodes for templates*/
//     var childs = template.childNodes; 
//     var className = template.getAttribute('templateClass'); 

//     if( UT.templates[className] === undefined ) { UT.loadTemplate(className, template); }
//     else{  return UT.templates[className]; }
    
//     var utClass = UT.templates[className]; 
//     var searchLayers = Utils.toArray(childs); 
//     while( searchLayers.length > 0 )
//     {
//         var layer = searchLayers.shift();
//         if( !Utils.isDomElement( layer ) ){continue;}
//         if(  layer.hasAttribute('templateClass') ) { 
//             var childTemplate = buildTemplate( layer ); 
//             utClass[childTemplate.className] = childTemplate; 
//         }
//         else{
//             searchLayers = searchLayers.concat( Utils.toArray( layer.childNodes) ); 
//         }
//     }
//     return utClass; 
// }

// var templates = document.querySelectorAll('[templateClass]'); 
// Utils.each( templates , function(template, d) {
//     var utClass = buildTemplate(template); 
//     UT.templates[utClass.className] = utClass;
// }); 


// UT.templates.post.update({
//     url: 'favaa.php', 
//     type:'get',
//     data: { 'post_id': UT.templates.post.props.postid },
// }); 


/*Selective Updating.*/
// var post = document.querySelector('[templateClass=post]'); 

// UT.update( post , {
//     url: 'favaa.php', 
//     type:'get', 
//     data: {
//         'post_id':  post.getAttribute('postid') }, 
// }); 

/*Multiple Updating.*/

// var posts = document.querySelectorAll("[templateClass=post]"); 
// function postfn(post , ind){
//     return {
//         url: 'favaa.php', 
//         type:'get', 
//         data: {
//             'post_id':  post.getAttribute('postid') }, 
//         success: function(response, textStatus, jqXHR){
//             Called immediately after the data is loaded. 
//             try{
//                 response = JSON.parse(response);
//             }catch(e){ return null; } // gets rid of the errors. 
            
//             console.log( response ); 
//             return response; 
//         }
//     }; 
// }

// UT.updates(posts, postfn );

var plem = document.querySelector("[templateclass=postList]"); 
var postlist = new UTClass('postlist' , plem);  
console.log(postlist); 
Ut.update(postlist);


