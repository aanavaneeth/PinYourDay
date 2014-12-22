/**
 * Created by Navaneeth on 16/11/2014.
 */
(function(){

    //Add events to menu items
    var buttonsList = document.querySelectorAll("core-item paper-button"),
        appMenu = document.getElementById("appmenu"),
        buttons = Array.prototype.slice.call(buttonsList,0);
    appMenu.addEventListener("click", function(evt){
            if((!!evt.target) && (evt.target.nodeName.toLowerCase() === "paper-button")){
                document.getElementById("scaff").shadowRoot
                            .getElementsByTagName("core-drawer-panel")[0].setAttribute("selected", "main");
                        var id = evt.target.getAttribute("id").match(/(\d+)/)[0];
                var currentHighlight = document.querySelector("core-item[active]");
                if(!!currentHighlight) {
                    setTimeout(function(){ //need to look into this!
                        currentHighlight.removeAttribute("active");
                        currentHighlight.classList.remove("core-selected");
                    }, 0);
                }
                evt.target.parentNode.setAttribute("active","");
                evt.target.parentNode.classList.add("core-selected");
                        Array.prototype.slice.call(document.querySelectorAll("#calendarPanel div:not([data-menuassociation='"+ id+"'])"),0)
                            .forEach(function(node){
                                node.style.display = "none";
                            });
                        document.querySelector("#calendarPanel div[data-menuassociation='"+ id+"']").style.display = "block";
            }
    }, false);

    //display overlay for adding event
    var addCalendarButton = document.getElementById("addCalendar"),
        overlay = document.getElementById("overlay"),
        addEventButton = document.getElementById("addEventButton"),
        eventvalue = document.getElementById("eventvalue");
    addCalendarButton.addEventListener("click", function(){
        overlay.open();
    }, false);

    //Adding event
    addEventButton.addEventListener("click",function(){
        var id;
        if(!!eventvalue.value){
            localforage.getItem("MarkYourDayLocalDB")
                .then(function(data){
                    var localDb = data;
                    if(!localDb){
                        localDb = {};
                        localDb.version = "0.0.1";
                        localDb.events = [];
                    }
                    id = localDb.events.length;
                    localDb.events.push({});
                    return localforage.setItem("MarkYourDayLocalDB", localDb);
                }, function(err){
                }).then(function(){
                    appMenu.innerHTML += ("<core-item> <paper-button id='btn"+ id +"'  class='blue-ripple'>"+eventvalue.value
                    +"</paper-button></core-item>");
                    document.querySelector("#calendarPanel").innerHTML += ("<div data-menuassociation = '"+ id
                    +"'><responsive-calendar id='cal"+id+"'></responsive-calendar></div>");
                    eventvalue.value = "";
                    overlay.close();
                    document.getElementById("btn"+id).click();
                });
        }
    }, false);


    //Add events to calendars
   var calendarList =  document.getElementsByTagName("responsive-calendar");
    Array.prototype.slice.call(calendarList, 0).forEach(function (calendar) {
        calendar.addEventListener("date-selected", function(evt) {
            var momentObj = evt.detail;
            console.log(momentObj.format("DD-MM-YYYY"));
        });
    });
})();
